import PropTypes from 'prop-types';
import React from 'react';

import Link from 'lib/Link';
import { callFunc, getHandler } from 'utils/actions';
import { get, isEmpty } from 'utils/lodash';

/**
 * Build either a single or multiple links inside a table-cell.
 *
 * @method      TableCellLinks
 * @param       {Object}       props Component props
 * @constructor
 */
function TableCellLinks(props) {
    const { cellProps, col, handlers, row } = props;
    const { cellType, items, onClick, ...cleanCellProps } = cellProps;
    // If we're only rendering a single link.
    if (isEmpty(items)) {
        // Extract the handler for the Link.
        const linkOnClick = getHandler(handlers, onClick);
        // Extract the value.
        const value = get(row, cellProps.key) || get(row, col.id) || get(cellProps, 'value');
        // Handle a single onClick if available.
        const handleOnClick = () => callFunc(linkOnClick, props);
        // Render the single table cell.
        return (
            <Link onClick={handleOnClick} {...cleanCellProps}>
                {value}
            </Link>
        );
    }
    // If we're rendering multiple links...
    return (
        <div>
            {items.map((item, itemIdx) => {
                const { onClick: onClickHandler, value = '', ...rest } = item;
                const key = `${value}__${itemIdx}`;
                // Extract the handler for each of the items.
                const itemOnClick = getHandler(handlers, onClickHandler);
                // Handle onClick if available.
                function handleOnClick() {
                    callFunc(itemOnClick, props, item);
                }
                // Render the item.
                return (
                    <Link
                        gutterLeft={itemIdx !== 0 ? '10px' : '0'}
                        onClick={handleOnClick}
                        {...rest}
                        key={key}
                    >
                        {value}
                    </Link>
                );
            })}
        </div>
    );
}

TableCellLinks.propTypes = {
    /**
     * Props passed down to the inner cell `Link` component.
     */
    cellProps: PropTypes.object,
    /**
     * Info about the current table column.
     */
    col: PropTypes.object,
    /**
     * A map of action handlers passed down from the parent `DataView` component.
     */
    handlers: PropTypes.object,
    /**
     * The data about the current row.
     */
    row: PropTypes.object,
};

TableCellLinks.defaultProps = {
    cellProps: null,
    col: null,
    handlers: null,
    row: null,
};

export default TableCellLinks;
