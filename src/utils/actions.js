import _isEmpty from 'lodash/isEmpty';

/**
 * Get an action handler from a list of actions.
 *
 * @method getHandler
 * @param  {Object}   [actions={}]        The map of action handlers
 * @param  {string}   [handlerRef='']     The handler ref
 * @param  {Function} [defaultValue=null] The default value if handler is not found
 * @return {string}                       The found action handler ref
 */
export const getHandler = (actions = {}, handlerRef = '', defaultValue = null) =>
    !_isEmpty(actions) && handlerRef in actions ? actions[handlerRef] : defaultValue;

/**
 * Replace the `handlerRef` within a list of items with actual function calls.
 *
 * @method replaceHandlerRefs
 * @param  {Array}            [items=[]]        The list of items to update
 * @param  {Object}           [handlers={}]     The map of action handlers
 * @param  {string}           [refProp=null]    The prop for the `onClick` ref
 * @param  {Any}              [invokeWith=null] The data to invoke the `onClick` fn with
 * @return {Array}                              The original, updated list of items
 */
export const replaceHandlerRefs = (items = [], handlers = {}, refProp = null, invokeWith = null) =>
    items.map(item => {
        // Determine the `onClick` key
        const onClickKey = refProp && refProp in item ? refProp : 'onClick';
        // Extract the handler via the `handlerRef` from the `item`.
        const onClick =
            onClickKey in item && typeof item[onClickKey] === 'function'
                ? item[onClickKey]
                : getHandler(handlers, item[onClickKey]);
        // Return the updated `item`.
        return {
            ...item,
            // Update the `onClick` functionality if the `invokeWith` is available.
            onClick:
                !_isEmpty(invokeWith) && typeof onClick === 'function'
                    ? () => onClick(invokeWith)
                    : onClick,
        };
    });

/**
 * Call a function with some arguments.
 * NOTE: Only call the function if it's a valid 'function'.
 *
 * @method callFunc
 * @param  {Function} func The function to call
 * @param  {*}        args The arguments for the function
 * @return {*}
 */
export function callFunc(func, ...args) {
    return typeof func === 'function' ? func(...args) : null;
}
