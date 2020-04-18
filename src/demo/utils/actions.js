import constants from 'namespace-constants';

import { ACTIONS_SUCCESS_SUFFIX, ACTIONS_ERROR_SUFFIX } from 'demo/constants/actions';

/**
 * Create actions for a specific entity
 *
 * @method createActionsFor
 * @param  {string}         entityName The name of the entity
 * @param  {Array}          list       The list of action names
 * @return {Object}                    A dictionary of actions
 */
export const createActionsFor = (entityName, list) => {
    const listCopy = Array.isArray(list) ? [...list] : [];
    // If the list is present,
    // we'll add an error and success suffix to each action
    listCopy.forEach(item => {
        listCopy.push(`${item}${ACTIONS_ERROR_SUFFIX}`);
        listCopy.push(`${item}${ACTIONS_SUCCESS_SUFFIX}`);
    });
    // Map the list to the provided entity name
    // i.e.
    // entity:LIST_ITEM_NAME
    // entity:LIST_ITEM_NAME_ERROR
    // entity:LIST_ITEM_NAME_SUCCESS
    return constants(entityName, listCopy);
};
