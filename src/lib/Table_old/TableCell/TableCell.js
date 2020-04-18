import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';
import compose from 'recompose/compose';
import styled from 'styled-components';

import Tooltip from 'lib/Tooltip';
import { ArrowIcon } from 'lib/SvgIcon';
import { disableTableCell } from 'utils/table';
import { withActionHandlers } from 'lib/bindings';

import TableCellCSS from './TableCellCSS';
import TableCellChild from './TableCellChild';
import TableCellTitle from './TableCellTitle';
import defaultCellTypes from './types';
import withTableContext from '../withTableContext';

/**
 * Simple table-cell
 *
 * @type {Function}
 */
const TableCellStyled = styled.td`
    ${TableCellCSS};
`;

/**
 * Render an arrow icon based on the current order and column being equal
 *
 * @method renderArrowIcon
 * @param  {string}        orderBy The ordeby value
 * @param  {Object}        col     The column info
 * @return {JSX|null}
 */
const renderArrowIcon = (
    { orderBy, col } // eslint-disable-line react/prop-types
) => (orderBy === col.id ? <ArrowIcon style={{ width: 18, height: 18 }} /> : null);

/**
 * Render a sortable cell with an arrow icon
 *
 * @method renderSortableCell
 * @param  {Object}            props     The props for the component
 * @param  {Function}          Component The component to render
 * @return {JSX}
 */
const renderSortableCell = (props, Component) => (
    <Component {...props}>
        {_get(props, 'sortSchema.iconPosition') === 'left' ? renderArrowIcon(props) : null}
        {_get(props, 'children')}
        {_get(props, 'sortSchema.iconPosition') === 'left' ? null : renderArrowIcon(props)}
    </Component>
);

const TableCell = props => {
    const {
        baseUrl,
        cellProps,
        cellTypes,
        children,
        col,
        handlers,
        helpText,
        noDataAvailable,
        oAuthToken,
        orientation,
        position,
        row,
        schema,
        setRef,
        tooltipsList,
    } = props;
    // Combine the `cellTypes` from the context along with the default `cellTypes`.
    const tableCellTypes = {
        ...defaultCellTypes,
        ...cellTypes,
    };
    // Rebuild the `context` for the cell from the current props.
    const cellContext = {
        baseUrl,
        cellTypes,
        handlers,
        helpText,
        oAuthToken,
        schema,
    };
    // Should the table cell be disabled?
    const disabled = disableTableCell(props);
    // NOTE: Removing the big data prop from the TableCellStyled.
    // It just pollutes the DOM.
    const componentProps = {
        disabled,
        ..._omit(props, [
            'actions',
            'baseUrl',
            'cellTypes',
            'data',
            'handlers',
            'helpText',
            'noDataAvailable',
            'oAuthToken',
            'schema',
            'selectable',
            'setRef',
        ]),
        cellContext,
    };
    // Determine the type of table-cell to render.
    const type = _get(cellProps, 'type');
    // Determine the component to use based on the position
    // of the table cell in the table.
    // Usually only used for table header since we use 'th' instead of 'td'
    const Component = position === 'head' ? tableCellTypes['head'] : TableCellStyled;

    // Build the children for the TableCell.
    const getChildren = () => {
        if (type && tableCellTypes[type]) {
            const Cell = tableCellTypes[type];
            return <Cell {...componentProps} setRef={setRef} />;
        } else {
            return children;
        }
    };

    // If the type is 'sortable' then we'll render the sortable TableCell.
    if (type === 'sortable') {
        return renderSortableCell(componentProps, Component);
    }

    // Return the final Table Cell Component.
    return (
        <Component {...componentProps} setRef={type === 'default' && setRef}>
            {_get(orientation, 'header') !== false && (
                <TableCellTitle orientation={orientation}>
                    {col.title}
                    {' :'}
                </TableCellTitle>
            )}
            {!_isEmpty(helpText) && typeof helpText === 'object' ? (
                <Tooltip
                    content={getChildren()}
                    {...helpText}
                    tooltipProps={{ baseUrl, col, oAuthToken, row }}
                    tooltipsList={tooltipsList}
                >
                    <TableCellChild orientation={orientation} noDataAvailable={noDataAvailable}>
                        {getChildren()}
                    </TableCellChild>
                </Tooltip>
            ) : (
                <TableCellChild orientation={orientation} noDataAvailable={noDataAvailable}>
                    {getChildren()}
                </TableCellChild>
            )}
        </Component>
    );
};

TableCell.propTypes = {
    /**
     * A base URL for making the API calls.
     */
    baseUrl: PropTypes.string,
    /**
     * What type of table cell are we rendering?
     * We can re-define the type of cell, it's value,
     * or the internal key it's associated with.
     * If we provide a key, then the table cell will
     * try to extract the key from its internal row-data.
     * Defaults to 'default' / 'text'.
     */
    cellProps: PropTypes.shape({
        key: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
    }),
    cellTypes: PropTypes.object,
    /**
     * Table cell contents
     */
    children: PropTypes.node,
    /**
     * Properties of the current table-column
     */
    col: PropTypes.object,
    handlers: PropTypes.object,
    /**
     * Add a Tooltip component to the TableCell.
     */
    helpText: PropTypes.object,
    /**
     * A boolean representing that no data is available for the table.
     */
    noDataAvailable: PropTypes.bool,
    /**
     * An oAuth token to make API calls.
     */
    oAuthToken: PropTypes.string,
    /**
     * The orientation of the table, 'portrait' or 'landscape'
     */
    orientation: PropTypes.object,
    /**
     * Where are we positioning the table cell? head, body, or footer?
     * Defaults to 'body'.
     */
    position: PropTypes.oneOf(['head', 'body', 'footer']),
    /**
     * Properties of the current table-row
     */
    row: PropTypes.object,
    schema: PropTypes.object,
    /**
     * Set the ref attribute on the current table cell
     */
    setRef: PropTypes.object,
    /**
     * A list of tooltip components.
     */
    tooltipsList: PropTypes.array,
};

TableCell.defaultProps = {
    baseUrl: null,
    cellProps: {
        type: 'default',
    },
    cellTypes: null,
    children: null,
    col: {},
    handlers: null,
    helpText: null,
    noDataAvailable: false,
    oAuthToken: null,
    orientation: {},
    position: 'body',
    row: {},
    schema: null,
    setRef: null,
    tooltipsList: null,
};

export default compose(withTableContext, withActionHandlers)(TableCell);
