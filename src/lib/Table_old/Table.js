import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

export const TableContext = React.createContext({
    // The base url for making the internal API calls.
    baseUrl: '',
    // The different types of available table-cells.
    cellTypes: {},
    // The data to be rendered in the table.
    data: [],
    // The action handlers for the table.
    handlers: {},
    // The oAuth token for making the internal API calls.
    oAuthToken: '',
    // The sorting order.
    order: '',
    // The sorting key.
    orderBy: '',
    // The table schema.
    schema: {},
    // Add a selectable checkbox input for the row.
    selectable: null,
});

const TableStyled = styled.table`
    border-collapse: initial;
    border-radius: 5px;
    border-spacing: 0;
    border: 1px solid ${getThemeProps('palette.common.lighter')};
    display: table;
    overflow: hidden;
    overflow-y: visible;
    width: 100%;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('Table.styles')};
`;

const Table = ({ context, ...rest }) => (
    <TableContext.Provider value={{ ...context }}>
        <TableStyled {...rest} />
    </TableContext.Provider>
);

Table.propTypes = {
    /**
     * Add a context value to the Table and its children.
     */
    context: PropTypes.object,
};

Table.defaultProps = {
    context: {},
};

export default Table;
