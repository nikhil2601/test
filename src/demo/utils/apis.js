/**
 * Get info about the apis from the given schema
 *
 * @method getApisInfo
 * @param  {Object}    [schema={}]   The passed in schema
 * @param  {string}    [dataKey=''] The dataKey to search for
 * @return {Object}
 */
export const getApisInfo = (schema = {}, dataKey = '') => {
    // If schema isn't present then return empty info object
    if (!schema) {
        return {};
    }
    // Extract the apisInfo
    const apisInfo = schema.apis || {};
    // If the apisInfo is empty, we return an empty object
    if (!apisInfo || !Object.keys(apisInfo).length) {
        return {};
    }
    // Otherwise, we search for the given dataKey
    if (Array.isArray(apisInfo)) {
        return apisInfo.find(api => api.dataKey === dataKey);
    }
    // Return the searched info
    return apisInfo;
};
