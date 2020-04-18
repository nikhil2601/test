import _get from 'lodash/get';

/**
 * Calculate the zebra style via the given index and zebra property
 *
 * @method getZebraStyle
 * @param  {number}      index The current index to test
 * @param  {string}      zebra The zebra property, 'odd' or 'even'
 * @return {boolean}
 */
export const getZebraStyle = (index, zebra) => {
    // Increment the index by 1 to start at 1
    const idx = index + 1;
    // Switch on the zebra prop of 'odd' or 'even'
    switch (zebra) {
        case 'odd':
            return Math.abs(idx % 2) === 1;
        case 'even':
            return idx % 2 === 0;
        default:
            return false;
    }
};

/**
 * Should we disable the table-cell?
 *
 * @method disableTableCell
 * @param  {Object}         col      The column schema
 * @param  {Object}         row      The current data-set
 * @param  {Object}         handlers A list of action handlers
 * @return {boolean}                 Whether or not the table-cell is disabled
 */
export const disableTableCell = ({ col, row, handlers }) => {
    const disableKeys = _get(col, 'disabled');
    // Return `false` if no disable keys are found.
    if (!disableKeys) {
        return false;
    }
    // If keys is a string, let's look for it in the handlers
    if (typeof disableKeys === 'string' && disableKeys in handlers) {
        return handlers[disableKeys](row);
    }
    // Determine if the required keys match their
    // values for the current data set.
    return (
        row &&
        Object.keys(disableKeys).every(
            key => Boolean(key in row) && Boolean(row[key] === disableKeys[key])
        )
    );
};
