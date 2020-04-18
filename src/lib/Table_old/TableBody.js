import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';

import { genID } from 'utils/generate';
import { getThemeProps } from 'utils/theme';
import { getZebraStyle } from 'utils/table';

import TableCell from './TableCell';
import TableRow from './TableRow';
import withTableContext from './withTableContext';

const TableBodyStyled = styled.tbody`
    display: block;
    /**
     * Display as a regular table element above mobile view
     */
    ${({ theme }) => theme.media.up('sm')`
        display: table-row-group;
    `};
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('TableBody.styles')};
    /**
     * If the orientation is in 'portrait' mode,
     * then force the display to be 'block'
     */
    ${({ orientation }) => ({
        display: _get(orientation, 'mode', 'landscape') === 'portrait' && 'block !important',
    })};
`;

const TableBody = ({ data, schema, tooltips, selectable }) => {
    const colSchema = _get(schema, 'columns', []);
    const rowsSchema = _get(schema, 'rows', {});
    const orientation = _get(schema, 'orientation', {});
    const cleanColSchema = col => {
        const newCol = { ...col };
        delete newCol.actions;
        delete newCol.cellProps;
        return newCol;
    };

    if (!Object.keys(colSchema).length) {
        return null;
    }

    return (
        <TableBodyStyled orientation={orientation}>
            {(!data || data.length === 0) && (
                <TableRow>
                    <TableCell colSpan={colSchema.length} noDataAvailable>
                        <p style={{ margin: 0, textAlign: 'center' }}>No Data Available</p>
                    </TableCell>
                </TableRow>
            )}
            {data &&
                data.length > 0 &&
                data.map((row, rowIdx) => (
                    <TableRow
                        key={genID('TableBodyRow')}
                        row={row}
                        {...rowsSchema}
                        orientation={orientation}
                        zebra={getZebraStyle(rowIdx, rowsSchema.zebra)}
                    >
                        {typeof selectable === 'function' && (
                            <TableCell
                                key={genID('TableBodyCell')}
                                orientation={orientation}
                                position="body"
                                row={row}
                                tooltipsList={tooltips}
                            >
                                {selectable(row)}
                            </TableCell>
                        )}
                        {colSchema.map((col, colIdx) => (
                            <TableCell
                                actions={col.actions}
                                col={cleanColSchema(col)}
                                data-title={col.title}
                                helpText={col.helpText}
                                key={genID('TableBodyCell')}
                                orientation={orientation}
                                position="body"
                                row={row}
                                tooltipsList={tooltips}
                                cellProps={col.cellProps}
                            >
                                {_get(row, col.id, '-')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
        </TableBodyStyled>
    );
};

TableBody.propTypes = {
    /**
     * The main data for the TableBody.
     */
    data: PropTypes.array,
    /**
     * The JSON Schema informatoin about the columns, etc.
     */
    schema: PropTypes.object.isRequired,
    /**
     * A list of tooltip components.
     */
    tooltips: PropTypes.array,
    /**
     * `renderProp` to allow for a table-row to be selectable.
     */
    selectable: PropTypes.func,
};

TableBody.defaultProps = {
    data: [],
    tooltips: [],
    selectable: null,
};

export default withTableContext(TableBody);
