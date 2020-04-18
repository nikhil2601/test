/**
 * Calculate a sorting order for the api calls
 *
 * @method calculateSort
 * @param  {string}      order   The order, either 'asc' or 'desc'
 * @param  {string}      orderBy The property to order
 * @return {string|null}         The final sort string, or null
 */
export const calculateSort = (order, orderBy) => {
    // If either order or orderBy is empty,
    // return null
    if (!order || !orderBy || typeof orderBy !== 'string') {
        return null;
    }
    // Return the + or - based on the order
    switch (order) {
        case 'asc':
            return `+${orderBy}`;
        case 'desc':
            return `-${orderBy}`;
        default:
            return null;
    }
};
