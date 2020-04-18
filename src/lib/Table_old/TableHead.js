import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';

import { genID } from 'utils/generate';
import { getThemeProps } from 'utils/theme';

import TableCell from './TableCell';
import TableRow from './TableRow';
import withTableContext from './withTableContext';

const TableHeadStyled = styled.thead`
    display: none;
    /**
     * Display as a regular table element above mobile view.
     */
    ${({ theme }) => theme.media.up('sm')`
        display: table-header-group;
    `};
    /**
     * Add all the remaining styles from the theme
     *
     */
    ${getThemeProps('TableHead.styles')};
`;

const TableHead = ({ data, onSortChange, order, orderBy, schema, selectable }) => {
    const colSchema = _get(schema, 'columns', []);
    const orientation = _get(schema, 'orientation', {});
    const sortSchema = _get(schema, 'sorting', {});
    const sortSchemaActive = Boolean(Object.keys(sortSchema).length);

    if (!Object.keys(colSchema).length || orientation.mode === 'portrait') {
        return null;
    }

    return (
        <TableHeadStyled>
            <TableRow>
                {typeof selectable === 'function' && (
                    <TableCell
                        key={genID('TableHeadCell')}
                        position="head"
                        cellProps={{ type: 'default' }}
                    />
                )}
                {colSchema.map((col, colIdx) => (
                    <TableCell
                        col={col}
                        key={genID('TableHeadCell')}
                        onClick={sortSchemaActive && col.id ? onSortChange(order, col.id) : null}
                        order={order}
                        orderBy={orderBy}
                        position="head"
                        sortSchema={sortSchema}
                        cellProps={{ type: sortSchemaActive ? 'sortable' : 'default' }}
                    >
                        {col.title}
                    </TableCell>
                ))}
            </TableRow>
        </TableHeadStyled>
    );
};

TableHead.propTypes = {
    /**
     * The main data.
     */
    data: PropTypes.array,
    /**
     * Function to run on each sort change.
     */
    onSortChange: PropTypes.func,
    /**
     * The current order of the rows.
     */
    order: PropTypes.string,
    /**
     * The current order ID of the columns.
     */
    orderBy: PropTypes.string,
    /**
     * The JSON Schema informatoin about the columns, etc.
     */
    schema: PropTypes.object.isRequired,
    /**
     * `renderProp` to allow for a table-row to be selectable.
     */
    selectable: PropTypes.func,
};

TableHead.defaultProps = {
    data: [],
    onSortChange: () => {},
    order: null,
    orderBy: null,
    selectable: null,
};

export default withTableContext(TableHead);
