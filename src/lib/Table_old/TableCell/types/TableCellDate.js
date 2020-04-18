import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { formatDate } from 'utils/date';

function TableCellDate({ col, row, cellProps, ...rest }) {
    const format = _get(cellProps, 'format');
    let value = _get(row, cellProps.key) || _get(row, col.id) || _get(cellProps, 'value');
    // If the value is a number, we need to fix its length due to Java APIs
    // returning a 10 digit timestamp.
    if (typeof value === 'number') {
        value = String(value).length >= 13 ? Number(value) : Number(value) * 1000;
    }
    // Format the date.
    const date = formatDate(value, format);
    // FIX: for the `date-fns` library, where if we send an invalid date, or none at all,
    // it returns an `Invalid Date` string. We just want to make sure we don't display
    // that string to the user. Thus we return a single hyphen '-', just like other table cells.
    if (!value || date.toLowerCase() === 'invalid date') {
        return '-';
    }
    // Return the formatted date otherwise.
    return date;
}

TableCellDate.propTypes = {
    cellProps: PropTypes.object,
    col: PropTypes.object,
    row: PropTypes.object,
};

TableCellDate.defaultProps = {
    cellProps: {},
    col: {},
    row: {},
};

export default TableCellDate;
