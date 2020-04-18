import { createActionsFor } from 'demo/utils/actions';

/**
 * Define the different actions for the Auth module
 *
 * @type {Object}
 */
const AUTH_ACTIONS = createActionsFor('auth', ['FETCH_TOKEN', 'FETCH_TOKEN_FROM_CODE', 'LOGOUT']);

export default AUTH_ACTIONS;
