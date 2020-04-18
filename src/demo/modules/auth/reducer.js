import _get from 'lodash/get';
import { createSelector } from 'reselect';

import { createReducer } from 'demo/utils/reducer';

import * as helpers from './reducerHelpers';
import AUTH_ACTIONS from './actionTypes';

/**
 * The initial state for the auth reducer
 *
 * @type {Object}
 */
const INITIAL_STATE = {
    token: {},
};

/**
 * Build the auth reducer's dictionary which contains a list
 * of all the available actions and their handlers
 *
 * @type {Object}
 */
const auth = {
    [AUTH_ACTIONS.FETCH_TOKEN_FROM_CODE_SUCCESS]: helpers.fetchTokenSuccess,
    [AUTH_ACTIONS.FETCH_TOKEN_SUCCESS]: helpers.fetchTokenSuccess,
    [AUTH_ACTIONS.LOGOUT]: helpers.logout,
};

// By default we will export out the built reducer via the createReducer() function.
export default createReducer(INITIAL_STATE, auth);

// SELECTORS

/**
 * Get all the info about the current token
 *
 * @method getToken
 * @param  {Object} state The current state
 * @return {Object}       The token info
 */
export const getToken = state => _get(state, 'auth.token', {});

/**
 * Get all the info about the current auth error.
 *
 * @method getAuthError
 * @param  {Object}     state The current state
 * @return {Object}           The auth error info
 */
export const getAuthError = state => _get(state, 'auth.error', {});

/**
 * Get the login error from the auth state.
 *
 * @method getLoginError
 * @param  {Object}       state The current state
 * @return {string}             The login error info
 */
export const getLoginError = createSelector([getAuthError], authError =>
    _get(authError, 'login', {})
);

/**
 * Get the access token from the auth state
 *
 * @method getAccessToken
 * @param  {Object}       state The current state
 * @return {string}             The access token
 */
export const getAccessToken = createSelector([getToken], token => _get(token, 'access_token', ''));
/**
 * Get the refresh token from the auth state
 *
 * @method getRefreshToken
 * @param  {Object}        state The current state
 * @return {string}              The refresh token
 */
export const getRefreshToken = createSelector([getToken], token =>
    _get(token, 'refresh_token', '')
);

/**
 * Get the amount of time that the token expires in
 *
 * @method getTokenExpiresIn
 * @param  {Object}          state The current state
 * @return {number}                The expires in time for the token
 */
export const getTokenExpiresIn = createSelector([getToken], token => _get(token, 'expires_in'));

/**
 * Get the timestamp when the token was last fetched
 *
 * @method getTokenFetchedAt
 * @param  {Object}          state The current state
 * @return {number}                The fetched at time for the token
 */
export const getTokenFetchedAt = createSelector([getToken], token => _get(token, 'fetched_at'));
