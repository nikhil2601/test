import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import templateReplace from 'es6-template-strings';

import Col from 'lib/Col';
import Radio from 'lib/Radio';
import Row from 'lib/Row';
import Typography from 'lib/Typography';
import { AsyncSelect as Select } from 'lib/Select';
import { extractAPIConfig, fetchAPIData } from 'utils/apis';
import { mergeObjects } from 'utils/merge';

class DocSendFromWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialSelectOptions: null,
        };
        // Bind the async func.
        this.fetchSelectOptions = this.fetchSelectOptions.bind(this);
    }

    componentDidMount() {
        // Fetch the default set of options upon mount.
        this.fetchSelectOptions();
    }

    componentDidUpdate(prevProps, prevState) {
        const { options } = this.props;
        // If the options are not equal, then we will refresh the already loaded data.
        if (!_isEqual(options, prevProps.options)) {
            this.fetchSelectOptions(null, null, true);
        }
    }

    handleRadioOnChange = label => () => {
        const { onChange } = this.props;

        typeof onChange === 'function' && onChange(label);
    };

    handleSelectOnChange = option => {
        const { onChange } = this.props;
        const value = _get(option, 'value', '');

        typeof onChange === 'function' && onChange(value);
    };

    async fetchSelectOptions(searchSpec, selectOptions, updateDefaultOptions = false) {
        try {
            const { options } = this.props;
            const { config, selectProps } = options;
            const { selectLabel, selectValue } = selectProps;
            const { oAuthToken, schema } = config;
            const apis = _get(schema, 'apis');
            // If no `baseURL` is found, then we will just return.
            if (!_get(apis, 'request.baseURL')) {
                this.setState(() => ({ initialSelectOptions: [] }));
                return null;
            }
            // Extract some info from the `schema`
            const api = extractAPIConfig(apis, 'data');
            const dataKey = _get(api, 'dataKey', 'data');
            const request = _get(api, 'request', {});
            const paramsMap = _get(api, 'paramsMap', {});
            const Authorization = _get(request, 'headers.Authorization');
            const { searchSpecKey = 'searchSpec' } = paramsMap;
            // Build the `axios` config.
            const apiConfig = mergeObjects(request, {
                headers: {
                    Authorization: Authorization ? Authorization : `Bearer ${oAuthToken}`,
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
                      label: templateReplace(selectLabel, i),
                      value: templateReplace(selectValue, i),
                  }))
                : [];
            // Update the state.
            this.setState(prevState => {
                // We only want to update the state on the initial load.
                // NOTE: If we return `null` from a `setState()` func call,
                // it doesn't update the state or run a re-render!
                if (!updateDefaultOptions && prevState.initialSelectOptions) {
                    return null;
                }
                // Return the initialSelectOptions.
                return {
                    initialSelectOptions: formattedData,
                };
            });
            // Return the data
            return formattedData;
        } catch (e) {
            // Return an empty array.
            return [];
        }
    }

    render() {
        const { initialSelectOptions } = this.state;
        const { options, placeholder, required, value } = this.props;
        const { displayLabel, displayValue, selectProps = {} } = options;
        const { selectLabel, selectValue, ...cleanSelectProps } = selectProps;
        const checked = displayValue === value;
        const extraSelectProps = checked ? { value: null } : {};

        return (
            <Row width="auto" alignItems="baseline">
                <Col size={2}>
                    <Typography type="label" gutterBottom="0" fullWidth>
                        <Radio
                            checked={checked}
                            margin="0 5px 0 0"
                            name={displayLabel}
                            onChange={this.handleRadioOnChange(displayValue)}
                            required={Boolean(!value && required)}
                            value={displayValue}
                            color="checkbox"
                        />
                        <span>{displayLabel}</span>
                    </Typography>
                </Col>
                {initialSelectOptions && initialSelectOptions.length === 1 && (
                    <Col size={10}>
                        <Typography type="label" gutterBottom="0" fullWidth noWrap>
                            <Radio
                                checked={value === initialSelectOptions[0].value}
                                margin="0 5px 0 0"
                                name={initialSelectOptions[0].value}
                                required={Boolean(!value && required)}
                                onChange={this.handleRadioOnChange(initialSelectOptions[0].value)}
                                value={initialSelectOptions[0].value}
                            />
                            <span>{initialSelectOptions[0].label}</span>
                        </Typography>
                    </Col>
                )}
                {(initialSelectOptions === null ||
                    (initialSelectOptions && initialSelectOptions.length > 1)) && (
                    <Col
                        size={10}
                        style={{
                            opacity:
                                initialSelectOptions === null || initialSelectOptions.length === 1
                                    ? '0'
                                    : '1',
                            transition: 'opacity 0.2s ease-in-out',
                        }}
                    >
                        <Select
                            cacheOptions
                            defaultOptions={initialSelectOptions}
                            loadOptions={this.fetchSelectOptions}
                            onChange={this.handleSelectOnChange}
                            placeholder={placeholder}
                            {...cleanSelectProps}
                            {...extraSelectProps}
                        />
                    </Col>
                )}
            </Row>
        );
    }
}

DocSendFromWidget.propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
};

DocSendFromWidget.defaultProps = {
    options: null,
    placeholder: null,
    required: null,
    value: null,
};

export default DocSendFromWidget;
