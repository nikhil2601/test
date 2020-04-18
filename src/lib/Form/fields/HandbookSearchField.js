import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import templateReplace from 'es6-template-strings';

import Col from 'lib/Col';
import Row from 'lib/Row';
import { AsyncSelect as Select } from 'lib/Select';
import { extractAPIConfig, fetchAPIData } from 'utils/apis';
import { mergeObjects } from 'utils/merge';

import FormGroupContent from './FormGroupContent';
import FormGroupTitle from './FormGroupTitle';

class HandbookSearchField extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        idSchema: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.object,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        schema: PropTypes.object,
        uiSchema: PropTypes.object,
        value: PropTypes.number,
    };

    static defaultProps = {
        disabled: null,
        idSchema: null,
        options: null,
        placeholder: null,
        required: null,
        schema: null,
        uiSchema: null,
        value: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            searchValue: {},
        };
        // Bind the async func.
        this.fetchSelectOptions = this.fetchSelectOptions.bind(this);
    }

    /**
     * Get the `ui:options` for the current field.
     *
     * @method _getUiOptions
     * @private
     * @param  {Object}      schema The schema to extract the options from
     * @return {Object}             The extracted options
     */
    _getUiOptions = schema => _get(schema, 'ui:options', {});

    /**
     * Styles for the hidden `input` element
     *
     * @method getHiddenInputStyle
     * @return {Object}
     */
    getHiddenInputStyle = () => ({
        height: 38,
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: -1,
    });

    handleHiddenInputOnChange = () => {};

    handleOptionDisabled = option => {
        const { value } = option;
        // We're disabling any and all handbooks that have policy alerts.
        return value.hasPolicyAlerts && value.hasPolicyAlerts === 1;
    };

    handleSelectOnChange = option => {
        const { onChange } = this.props;
        const value = _get(option, 'value', '');

        this.setState(
            () => ({
                searchValue: value,
            }),
            () => {
                typeof onChange === 'function' && onChange(value);
            }
        );
    };

    async fetchSelectOptions(searchSpec) {
        try {
            const { uiSchema } = this.props;
            const options = this._getUiOptions(uiSchema);
            const { optionLabel, optionValue, config } = options;
            const { oAuthToken, schema } = config;
            const apis = _get(schema, 'apis');
            // If no `baseURL` is found, then we will just return.
            if (!_get(apis, 'request.baseURL')) {
                return null;
            }
            // Extract some info from the `schema`
            const api = extractAPIConfig(apis, 'data');
            const dataKey = _get(api, 'dataKey', 'data');
            const paramsMap = _get(api, 'paramsMap', {});
            const request = _get(api, 'request', {});
            const Authorization = _get(request, 'headers.Authorization');
            const { searchSpecKey = 'searchSpec' } = paramsMap;
            // Build the `axios` config.
            const apiConfig = mergeObjects(request, {
                headers: {
                    Authorization: Authorization || `Bearer ${oAuthToken}`,
                },
                params: {
                    [searchSpecKey]: searchSpec,
                },
            });
            // Fetch the data
            const { data: respData } = await fetchAPIData(apiConfig, { data: dataKey });
            // Format the data
            const formattedData = respData
                ? respData.map(i => ({
                      label: templateReplace(optionLabel, i),
                      value: optionValue ? _get(i, optionValue) : i,
                  }))
                : [];
            // Return the data
            return formattedData;
        } catch (e) {
            return Promise.reject([]);
        }
    }

    render() {
        const { searchValue } = this.state;
        const { disabled, idSchema, required, schema, uiSchema } = this.props;
        const options = this._getUiOptions(uiSchema);
        // Extract the actual id of the field from the `idSchema`
        const id = _get(idSchema, '$id', '');
        // Extract the placeholder and selectProps.
        const { placeholder = '', selectProps = {} } = options;
        // Extract the title.
        const title = _get(schema, 'title');
        // Extract the title help text.
        const titleHelptext = _get(schema, 'helpText');
        // Determine if we are rendering a formGroup.
        const formGroup = _get(schema, 'formGroup', false);
        // Determine the hidden input's value.
        const hiddenInputValue = !_isEmpty(searchValue) ? JSON.stringify(searchValue) : '';

        return (
            <Row width="auto">
                <Col size={12}>
                    <FormGroupTitle
                        helpText={titleHelptext}
                        id={id}
                        required={required && Boolean(!searchValue)}
                        title={title}
                    />
                </Col>
                <Col size={12} style={{ position: 'relative' }}>
                    {formGroup ? (
                        <FormGroupContent schema={schema}>
                            <Select
                                cacheOptions
                                defaultOptions
                                loadOptions={this.fetchSelectOptions}
                                onChange={this.handleSelectOnChange}
                                placeholder={placeholder}
                                {...selectProps}
                            />
                        </FormGroupContent>
                    ) : (
                        <Select
                            cacheOptions
                            defaultOptions
                            loadOptions={this.fetchSelectOptions}
                            onChange={this.handleSelectOnChange}
                            placeholder={placeholder}
                            {...selectProps}
                        />
                    )}
                    <input
                        onChange={this.handleHiddenInputOnChange}
                        disabled={disabled}
                        id={id}
                        required={required}
                        style={this.getHiddenInputStyle()}
                        tabIndex={-1}
                        type="text"
                        value={hiddenInputValue}
                    />
                </Col>
            </Row>
        );
    }
}

export default HandbookSearchField;
