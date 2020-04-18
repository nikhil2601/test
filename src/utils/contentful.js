import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

/**
 * Normalize a given contentful field by extracting specific keys from it.
 *
 * @method normalizeContentfulField
 * @param  {Array}                  data     The list of field props
 * @param  {Array}                  keysList The list of keys to extract
 * @return {Array}                           The extracted field
 */
export function normalizeContentfulField(data, keysList) {
    try {
        // Data and Keys must be a list of items.
        if (!Array.isArray(data) || !Array.isArray(keysList)) {
            // throw new Error('The requested data and keys must be of type Array.');
            return null;
        }
        // For each of the fields, get the requested key.
        return data.map(field => {
            const updatedField = {};
            // Go through all the requested keys and extract them.
            keysList.forEach(({ key, label, defaultValue }) => {
                updatedField[label] = _get(field, key, defaultValue);
            });
            // Return the updated field.
            return updatedField;
        });
    } catch (e) {
        return null;
    }
}

/**
 * Normalize the list of categories for the Insights widget.
 *
 * @method normalizeInsightCategoriesList
 * @param  {Array}                        list The original list of categories
 * @return {Array}                             The updated list
 */
export function normalizeInsightCategoriesList(list) {
    try {
        // Make a copy of the original categories.
        const categories = [...list[0].fields.categories];
        // Normalize the categories list.
        const normalizedCategories = normalizeContentfulField(categories, [
            {
                key: 'sys.id',
                label: 'id',
            },
            {
                key: 'fields.name',
                label: 'name',
            },
            {
                key: 'fields.topics',
                label: 'topics',
                defaultValue: [],
            },
        ]).filter(cat => !_isEmpty(cat.topics));
        // Normalize the categories topics list.
        const normalizeCategoriesWithTopics = normalizedCategories.map(cat => ({
            ...cat,
            topics: normalizeContentfulField(cat.topics, [
                {
                    key: 'fields.name',
                    label: 'name',
                },
                {
                    key: 'sys.id',
                    label: 'id',
                },
            ]),
        }));
        // Return the normalized categories list.
        return normalizeCategoriesWithTopics;
    } catch (e) {
        return null;
    }
}
