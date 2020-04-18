/**
 * Prevent the default action the browser makes on the passed in event.
 *
 * @method preventDefault
 * @param  {Object}       event The synthetic event object
 * @return {Any}
 */
export const preventDefault = event =>
    typeof event.preventDefault === 'function' ? event.preventDefault() : null;

/**
 * Stop the passed in event from bubbling up the event chain.
 *
 * @method stopPropagation
 * @param  {Object}        event The synthetic event object
 * @return {Any}
 */
export const stopPropagation = event =>
    typeof event.stopPropagation === 'function' ? event.stopPropagation() : null;
