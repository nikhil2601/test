import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import Qs from 'qs';

import { calculateSort } from './sorting';

/**
 * Create a local axios instance.
 *
 * @type {Object}
 */
const AXIOS_INSTANCE = axios.create({
    paramsSerializer(params) {
        return Qs.stringify(params, { arrayFormat: 'repeat' });
    },
});

/**
 * An identity func for axios 'success' interceptor
 *
 * @method _successInterceptIdentity
 * @param  {Object}                  config The axios config object
 * @return {Object}
 */
const _successInterceptIdentity = config => config;

// const __errorInterceptIdentity = error => Promise.reject(error);
/**
 * An identity func for axios 'error' interceptor
 *
 * @method _errorInterceptIdentity
 * @param  {Object}                error The axios error
 * @return {Promise}
 */
async function _errorInterceptIdentity(error) {
    try {
        // Capture the original request.
        // NOTE: We want reference the config instead of making a copy.
        const originalRequest = error.config;
        // Do we have a invalid token error?
        const invalidTokenErrorThrown =
            error.response &&
            (error.response.status === 401 || error.response.status === 403) &&
            error.response.data.error === 'invalid_token';
        // Throw an error if we are re-trying a previous request.
        if (originalRequest && originalRequest.__isRetryRequest) {
            throw error;
        }
        // In case this request fails, let's add a `__isRetryRequest` flag to the config.
        if (originalRequest) {
            originalRequest.__isRetryRequest = true;
        }
        // Catch the `invalid_token` error for an expired JWT token.
        if (invalidTokenErrorThrown) {
            // Extract the `refreshToken` function call.
            const refreshTokenFunc = _get(error, 'config.refreshToken');
            // Only invoke the `refreshTokenFunc` if it's a function and defined.
            if (refreshTokenFunc && typeof refreshTokenFunc === 'function') {
                // Refresh the JWT token.
                const updatedToken = await refreshTokenFunc(error);
                // Update the headers of the previous API call with the new JWT token.
                originalRequest.headers.Authorization = `Bearer ${updatedToken}`;
                // Redo the last API call.
                return axios(originalRequest);
            } else {
                // Throw an error if the `refreshTokenFunc` is not avaiable
                throw error;
            }
        } else {
            // Throw an error if we're not trying to refresh the JWT token.
            throw error;
        }
    } catch (e) {
        // unable to refresh the token. We'll just reject the error.
        return Promise.reject(e);
    }
}

/**
 * Extract the requested API config from the given list of API configs, using the provided request `type`.
 *
 * @method extractAPIConfig
 * @param  {Array}          apis          The list of API requests
 * @param  {string}         [type='data'] The `dataType` key
 * @return {Object}                       The api request
 */
export const extractAPIConfig = (apis, type = 'data') =>
    Array.isArray(apis)
        ? apis.find(
              api => Object.prototype.hasOwnProperty.call(api, 'dataType') && api.dataType === type
          )
        : apis;

/**
 * A soft wrapper around the `axios` library.
 * Provides extra perks of requesting certain `keys` from the `resp.data` object.
 * Helps deal with the overhead of having to go through the `resp.data` and finding
 * the keys you want in multiple statements, and more.
 *
 * @method fetchAPIData
 * @param  {Object}     [config={}]      The axios config object
 * @param  {Object}     [dataKeysMap={}] A map of keys and values to retreive from the fetched data
 * @return {Promise}                     The `fetchData()` Promise
 */
export const fetchAPIData = async (config = {}, dataKeysMap = {}) => {
    try {
        // Add in the interceptors for refreshing the JWT token.
        AXIOS_INSTANCE.interceptors.response.use(
            _successInterceptIdentity,
            _errorInterceptIdentity
        );
        // Make the requested `api` call.
        const apiResp = await AXIOS_INSTANCE(config);
        // Create an empty response object.
        const resp = {};
        // If there is no `dataKeysList`, then we'll return the final data
        // from the API `response` object.
        if (_isEmpty(dataKeysMap) || typeof dataKeysMap !== 'object') {
            // In a generic `axios` request, the final response of the API
            // call is in the `resp.data` object. If present, return it,
            // otherwise return the full resp.
            resp.data = _get(apiResp, 'data', apiResp);
            // Return the updated `response`.
            return resp;
        }
        // If the `dataKeysMap` is present, we'll go through each of the keys,
        // find the corresponding data in the `resp` object, and update the
        // final `resp` object with them.
        Object.keys(dataKeysMap).forEach(keyName => {
            // Try to find the `data` for the requested `keyName`.
            const keyData = _get(apiResp, `data.${dataKeysMap[keyName]}`);

            resp[keyName] = keyData;
        });
        // Return the updated `response`.
        return resp;
    } catch (e) {
        // TODO: Add a better catch statement if needed.
        // For now, handling a Promise rejection here.
        return Promise.reject(e);
    }
};

/**
 * Build the data view API params for a given data view config.
 *
 * @method buildDataViewJapiApiParams
 * @param  {Object}                   [config={}] The given data view config
 * @return {Object}                               The set of params
 */
export function buildDataViewJapiApiParams(config = {}) {
    try {
        const { order, orderBy, page, rowsPerPage, searchSpec, totalRows, isActive } = config;
        // Check if searchSpec exist or set as undefined
        const search = searchSpec || undefined;
        // Determine the maxPages count.
        const maxPages = rowsPerPage > 0 ? Math.ceil(totalRows / rowsPerPage) : 0;
        // Determine the offset.
        const offset = maxPages === 0 || maxPages < page ? 0 : (page - 1) * rowsPerPage;
        // Calculate the sort based on the given order.
        const sort = calculateSort(order, orderBy);
        // Return the API params.
        return {
            limit: rowsPerPage,
            offset,
            searchSpec: search,
            sort,
            isActive,
        };
    } catch (e) {
        // Return an empty object on error.
        return {};
    }
}
