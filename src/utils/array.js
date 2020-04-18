/**
 * Move an item in the given Array from one idx to another,
 * without mutating the original array.
 *
 * @method moveArrayItem
 * @param  {Array}       array          The array to move items in
 * @param  {number}      fromIdx        The index to move item from
 * @param  {number}      toIdx          The new index to move item to
 * @param  {Any}         [newItem=null] The new item to add to the array
 * @return {Array}                      The updated array
 */
export function moveArrayItem(array, fromIdx, toIdx, newItem = null) {
    // Remove the item from the array first.
    const itemRemovedArray = [
        ...array.slice(0, fromIdx),
        ...array.slice(fromIdx + 1, array.length),
    ];
    // Add back in the item from the original array from the source index.
    return [
        ...itemRemovedArray.slice(0, toIdx),
        newItem || array[fromIdx],
        ...itemRemovedArray.slice(toIdx, itemRemovedArray.length),
    ];
}
