import deepmerge from 'deepmerge';

/**
 * Merge multiple objects together.
 *
 * @method mergeObjects
 * @param  {Array}      objects Pick up all of the objects to merge
 * @return {Object}             The final merged object
 */
export const mergeObjects = (...objects) =>
    deepmerge.all([...objects], { arrayMerge: (dest, src) => src });
