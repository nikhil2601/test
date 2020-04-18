import _get from 'lodash/get';

/**
 * Create a reducer based on an initial state and a map of reducer handlers.
 *
 * @method createReducer
 * @param  {Any}           initialState      The value to set the initial state with
 * @param  {Object}        [handlersList={}] The map of action handlers
 * @return {Function|Any}                    The reducer function or default state
 */
export const createReducer = (initialState, handlersList = {}) => (
    state = initialState,
    action
) => {
    const type = _get(action, 'type', '');
    const handler = _get(handlersList, type);
    return handler ? handler(state, action) : state;
};
