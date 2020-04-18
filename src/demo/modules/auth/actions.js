import axios from 'axios';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import getTime from 'date-fns/get_time';
import queryString from 'query-string';

import { API_ORIGIN } from 'demo/constants/api';
import { getClientID, getClientSecret, getReturnURL } from 'demo/utils/env';

import * as authSelectors from './reducer';
import AUTH_ACTIONS from './actionTypes';

/**
 * Fetch the auth token main action
 *
 * @method fetchAuthTokenAction
 * @param  {Object}             userCreds       The user's credentials
 * @param  {Object}             accessTokenData The urlencoded formData for the request
 * @return {Promise}
 */
export const fetchAuthTokenAction = async (userCreds, accessTokenData) => {
    try {
        const resp = await axios({
            auth: {
                username: userCreds.clientId,
                password: userCreds.clientSecret,
            },
            baseURL: API_ORIGIN,
            data: queryString.stringify(accessTokenData),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            method: 'post',
            url: '/v1/oauth/token',
        });

        return resp;
    } catch (e) {
        return Promise.reject(e);
    }
};

/**
 * Success action for fetching the auth token
 *
 * @method fetchAuthTokenSuccessAction
 * @param  {Object}                    data The data for the auth token request
 * @return {Action}
 */
export const fetchAuthTokenSuccessAction = data => ({
    type: AUTH_ACTIONS.FETCH_TOKEN_SUCCESS,
    payload: {
        ...data,
    },
});

/**
 * Success action for fetching the auth token from code
 *
 * @method fetchAuthTokenFromCodeSuccessAction
 * @param  {Object}                            data The data for the auth token request
 * @return {Action}
 */
export const fetchAuthTokenFromCodeSuccessAction = data => ({
    type: AUTH_ACTIONS.FETCH_TOKEN_FROM_CODE_SUCCESS,
    payload: {
        ...data,
    },
});

/**
 * Failure action for fetching the auth token
 *
 * @method fetchAuthTokenFailuresAction
 * @param  {Object}                     error The error for the fetch auth token fail
 * @return {Action}
 */
export const fetchAuthTokenFailuresAction = error => ({
    type: AUTH_ACTIONS.FETCH_TOKEN_FAILURE,
    payload: {
        error,
    },
});

/**
 * Failure action for fetching the auth token from code
 *
 * @method fetchAuthTokenFromCodeErrorAction
 * @param  {Object}                           error The error for the fetch auth token fail
 * @return {Action}
 */
export const fetchAuthTokenFromCodeErrorAction = error => ({
    type: AUTH_ACTIONS.FETCH_TOKEN_FROM_CODE_FAILURE,
    payload: {
        error,
    },
});

/**
 * The main fetch auth token action (redux-thunk)
 *
 * @method fetchAuthToken
 * @param  {Object}       userCreds User credentials object
 * @return {Function|Thunk}
 */
export const fetchAuthToken = userCreds => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        // Get the current state
        const state = getState();
        // Get the token's expires in time
        const tokenExpiresIn = authSelectors.getTokenExpiresIn(state);
        // Get the token's fetched at time
        const tokenFechedAt = authSelectors.getTokenFetchedAt(state);
        // Get the current timestamp
        const currentTimestamp = getTime(new Date());
        // Get the difference between the current timestamp and the token fetched at timestamp
        const difference = differenceInSeconds(currentTimestamp, tokenFechedAt);
        // Determine if we should fetch a new token or continue with the one we already have
        const fetchNewToken = difference > tokenExpiresIn;
        // Build the access token data
        const accessTokenData = {
            grant_type: 'password',
            password: userCreds.password,
            username: userCreds.username,
        };
        // fetch the oAuth token
        if (fetchNewToken || !tokenExpiresIn) {
            fetchAuthTokenAction(userCreds, accessTokenData)
                .then(resp => {
                    dispatch(fetchAuthTokenSuccessAction(resp));
                    resolve(resp);
                })
                .catch(err => {
                    dispatch(fetchAuthTokenFailuresAction(err));
                    reject(err);
                });
        } else {
            resolve();
        }
    });

/**
 * Fetch the oAuth token from a given oAuth code.
 *
 * @method fetchAuthTokenFromCode
 * @param  {Object}               userCreds The user credentials
 * @param  {string}               authCode  The oAuth code
 * @return {Function|Thunk}
 */
export const fetchAuthTokenFromCode = (userCreds, authCode) => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        // Build the access token data
        const accessTokenData = {
            client_id: getClientID(),
            client_secret: getClientSecret(),
            code: authCode,
            grant_type: 'authorization_code',
            redirect_uri: getReturnURL(),
        };
        // Fetch the oAuth token.
        fetchAuthTokenAction(userCreds, accessTokenData)
            .then(resp => {
                dispatch(fetchAuthTokenFromCodeSuccessAction(resp));
                resolve(resp);
            })
            .catch(err => {
                dispatch(fetchAuthTokenFromCodeErrorAction(err));
                reject(err);
            });
    });

/**
 * Logout the current user
 *
 * @method logoutUser
 * @return {Action}
 */
export const logoutUser = () => ({
    type: AUTH_ACTIONS.LOGOUT,
});
