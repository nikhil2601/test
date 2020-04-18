import _isEmpty from 'lodash/isEmpty';

/**
 * Check the keys of an object to match the values provided in the keys map.
 *
 * @method checkObjectKeys
 * @param  {Object}          [object={}]   The object to check the keys map against
 * @param  {Object}          [keysMap={}]  The keys map to check the object for
 * @param  {Object}          [handlers={}] A map of action handlers in case the keysMap is a string
 * @return {boolean|Function}
 */
export const checkObjectKeys = (object = {}, keysMap = {}, handlers = {}) => {
    // Return back the `boolean` value if present.
    // NOTE: Edge case, should not be set explicitely.
    if (typeof keysMap === 'boolean') {
        return keysMap;
    }
    // Return `false` if no keys are found.
    if (_isEmpty(keysMap)) {
        return false;
    }
    // If the keysMap is a `string`, let's look for it in the handlers.
    if (typeof keysMap === 'string' && handlers && keysMap in handlers) {
        return handlers[keysMap](object);
    }
    // Determine if the required keysMap values match
    // their counterparts in  the current `object` data set.
    return (
        !_isEmpty(object) &&
        Object.keys(keysMap).every(
            key => Boolean(key in object) && Boolean(object[key] === keysMap[key])
        )
    );
};
