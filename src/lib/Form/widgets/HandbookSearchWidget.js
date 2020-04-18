import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import templateReplace from 'es6-template-strings';

import Col from 'lib/Col';
import Row from 'lib/Row';
import { AsyncSelect as Select } from 'lib/Select';
import { extractAPIConfig, fetchAPIData } from 'utils/apis';
import { mergeObjects } from 'utils/merge';

class HandbookSearchWidget extends React.Component {
    constructor(props) {
        super(props);
        // Bind the async func.
        this.fetchSelectOptions = this.fetchSelectOptions.bind(this);
    }

    handleSelectOnChange = option => {
        const { onChange } = this.props;
        const value = _get(option, 'value', '');

        typeof onChange === 'function' && onChange(value);
    };

    async fetchSelectOptions(searchSpec) {
        try {
            const { options } = this.props;
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
                      label: templateReplace(optionLabel, i),
                      value: _get(i, optionValue),
                  }))
                : [];
            // Return the data
            return formattedData;
        } catch (e) {
            return Promise.reject([]);
        }
    }

    render() {
        const { options, placeholder } = this.props;
        const { selectProps = {} } = options;

        return (
            <Row width="auto" alignItems="baseline">
                <Col>
                    <Select
                        cacheOptions
                        defaultOptions
                        loadOptions={this.fetchSelectOptions}
                        onChange={this.handleSelectOnChange}
                        placeholder={placeholder}
                        {...selectProps}
                    />
                </Col>
            </Row>
        );
    }
}

HandbookSearchWidget.propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.number,
};

HandbookSearchWidget.defaultProps = {
    options: null,
    placeholder: null,
    required: null,
    value: null,
};

export default HandbookSearchWidget;
