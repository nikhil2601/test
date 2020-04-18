/**
 * Calculate the last page of a pagination component
 *
 * @method calculateLastPage
 * @param  {number}          count        The total count of items
 * @param  {number}          itemsPerPage The amount of items per page
 * @return {number}                       The calculated last page
 */
export const calculateLastPage = (count, itemsPerPage) =>
    Math.max(0, Math.ceil(count / itemsPerPage)) || 1;
