import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';

/**
 * Add a single value to a given schema.
 *
 * @method addSchemaValue
 * @param  {Object}       [schema={}]    The schema to update
 * @param  {string}       [path='']      The path at which to update
 * @param  {Any}          [value=null]   The value to add @ the path
 * @param  {boolean}      [mutate=true] Should we mutate the schema?
 * @return {Object}
 */
export const addSchemaValue = (schema = {}, path = '', value = null, mutate = true) => {
    // Do we really want to mutate the schema?
    if (mutate) {
        // By default `lodash/set` mutates the passed in object.
        return _set(schema, path, value);
    }
    // Make a deep copy of the schema.
    const schemaClone = _cloneDeep(schema);
    // Mutate the copied schema with the required value @ path.
    _set(schemaClone, path, value);
    // Return the updated copied schema. Mutation free.
    return schemaClone;
};
