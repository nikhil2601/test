/**
 * Update a given filter for the ListFilters
 *
 * @method updateListFilter
 * @param  {Array}          filtersList    The original list of filters
 * @param  {Object}         newFilter      The new filter info
 * @return {Array}
 */
export function updateListFilter(filtersList, newFilter) {
    // Extract info from the new filter object.
    const { data, parentId } = newFilter;
    // Create an empty list of new filters.
    let updatedFiltersList = [];
    // If data and parentId are valid, update the filters list.
    if (data && data.length > 0 && parentId) {
        updatedFiltersList = filtersList.reduce((res, val) => {
            if (parentId === val.id) {
                return [
                    ...res,
                    {
                        ...val,
                        selected: [...data],
                    },
                ];
            }

            return [...res, val];
        }, []);
    }
    // Return the updated list of filters.
    return updatedFiltersList;
}

/**
 * Remove a given filter from the ListFilters
 *
 * @method removeListFilter
 * @param  {Array}          filtersList    The original list of filters
 * @param  {Object}         filterToRemove The filter to remove
 * @return {Array}
 */
export function removeListFilter(filtersList, filterToRemove) {
    // Extract info from the new filter object.
    const { id, parentId } = filterToRemove;
    // Create an empty list of new filters.
    let updatedFiltersList = [];
    // If we have a valid `parentId`, rebuild the filters list.
    if (parentId) {
        updatedFiltersList = filtersList.reduce((res, val) => {
            if (parentId === val.id) {
                return [
                    ...res,
                    {
                        ...val,
                        selected: val.selected.filter(selected => selected.id !== id),
                    },
                ];
            }

            return [...res, val];
        }, []);
    }
    // Return the updated list of filters.
    return updatedFiltersList;
}

/**
 * Clear the selected list from a given ListFilters
 *
 * @method clearAllSelectedFilters
 * @param  {Array}                 filtersList The current list of filters.
 * @return {Array}
 */
export function clearAllSelectedFilters(filtersList) {
    // Reset the `selected` key for each filter to an empty Array.
    return filtersList.map(filter => ({
        ...filter,
        selected: [],
    }));
}
