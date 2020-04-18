import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';

import { genID } from 'utils/generate';
import { getThemeProps } from 'utils/theme';

import TableCell from './TableCell';
import TableRow from './TableRow';

const TableFooterStyled = styled.tfoot`
    display: table-footer-group;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('TableFooter.styles')};
`;

const TableFooter = ({ schema, data }) => {
    const colSchema = _get(schema, 'columns', []);
    const orientation = _get(schema, 'orientation', {});

    if (!Object.keys(colSchema).length || orientation.mode === 'portrait') {
        return null;
    }

    return (
        <TableFooterStyled>
            <TableRow>
                {colSchema.map(col => (
                    <TableCell col={col} position="footer" key={genID('TableFooterCell')}>
                        {col.title}
                    </TableCell>
                ))}
            </TableRow>
        </TableFooterStyled>
    );
};

TableFooter.propTypes = {
    /**
     * The main data for the TableBody.
     */
    data: PropTypes.array,
    /**
     * The JSON Schema informatoin about the columns, etc.
     */
    schema: PropTypes.object.isRequired,
};

TableFooter.defaultProps = {
    data: [],
};

export default TableFooter;
