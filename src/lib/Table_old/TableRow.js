import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';
import compose from 'recompose/compose';

import { getThemeProps } from 'utils/theme';
import { withActionHandlers } from 'lib/bindings';

import withTableContext from './withTableContext';

const TableRowStyled = styled.tr`
    color: inherit;
    display: block;
    outline: none;
    vertical-align: middle;
    /**
     * Display as a regular table element above mobile view.
     */
    ${({ theme }) => theme.media.up('sm')`
        display: table-row
    `};
    /**
     * Add default + custom styles
     */
    ${({ orientation, selected, theme, zebra }) => {
        const selectedStyles = selected
            ? getThemeProps('TableRow.styles.selected', null, {
                  theme,
              })
            : {};
        const zebraStyles = zebra ? getThemeProps('TableRow.styles.zebra', null, { theme }) : {};

        return {
            // Add all of the remaining styles from theme
            ...getThemeProps('TableRow.styles', null, { theme }),
            // Add in the zebra styles
            ...zebraStyles,
            // Add in the selected styles
            ...selectedStyles,
            // If the orientation is in 'portrait' mode,
            // then force the display to be 'block'
            display: _get(orientation, 'mode') === 'portrait' && 'block !important',
        };
    }};
`;

TableRowStyled.propTypes = {
    /**
     * If the table row should stand out from the rest.
     */
    selected: PropTypes.bool,
    /**
     * If the table row should be zebra styled.
     */
    zebra: PropTypes.bool,
};

TableRowStyled.defaultProps = {
    selected: false,
    zebra: false,
};

const TableRow = props => {
    const { setRef, onSelection, handlers, data, ...rest } = props;

    const updatedProps = {
        ...rest,
        ref: setRef,
        onSelect: onSelection && handlers[onSelection],
    };

    return <TableRowStyled {...updatedProps} />;
};

TableRow.propTypes = {
    /**
     * The main data for the Table.
     */
    data: PropTypes.array,
    /**
     * Any external action handlers.
     */
    handlers: PropTypes.object,
    /**
     * Callback fired upon selecting a row
     */
    onSelection: PropTypes.string,
    /**
     * Set the ref attribute on the current table cell
     */
    setRef: PropTypes.object,
};

TableRow.defaultProps = {
    data: [],
    handlers: null,
    onSelection: null,
    setRef: null,
};

export default compose(withTableContext, withActionHandlers)(TableRow);
