import PropTypes from 'prop-types';
import React from 'react';
import rgba from 'polished/lib/color/rgba';
import styled, { css } from 'styled-components';

// import Row from 'lib/Row';
import { themeGet } from 'utils/theme';
import { checkObjectKeys } from 'utils/object';

const TableRowStyled = styled.tr`
    color: inherit;
    outline: none;
    vertical-align: middle;
    /**
     * Add all the remaining styles from the theme
     */
    ${themeGet('TableRow.styles')};
    /**
     * Add in dynamic styles.
     */
    ${({
        selected,
        selectedColor: selectedColorProps,
        selectedOpacity,
        theme,
        zebra,
        zebraColor: zebraColorProps,
        zebraOpacity,
    }) => {
        let selectedCss = '';
        let zebraCss = '';
        // Determine the selected row color.
        const selectedColor = themeGet(`palette.${selectedColorProps}.color`, '#FFF')({ theme });
        // Determine the zebra-stripe color.
        const zebraColor = themeGet(`palette.${zebraColorProps}.color`, '#FFF')({ theme });
        // Update the `selectedCss`
        if (selected) {
            selectedCss = css`
                background-color: ${rgba(selectedColor, selectedOpacity)};
            `;
        }
        // Update the `zebraCss`
        if (zebra) {
            zebraCss = css`
                background-color: ${rgba(zebraColor, zebraOpacity)};
            `;
        }
        // Return the concatenated zebra-style with selected-row-style.
        return css`
            ${zebraCss};
            ${selectedCss};
        `;
    }};
`;

/**
 * The `row` component for the Table.
 *
 * @constructor
 */
const TableRow = React.forwardRef((props, ref) => {
    const { selected: selectedProps, handlers, row, ...rest } = props;
    // Determine if the table-row should be selected.
    const selected =
        typeof selectedProps === 'boolean'
            ? selectedProps
            : checkObjectKeys(row, selectedProps, handlers);
    // Render the table-row
    return <TableRowStyled {...rest} selected={selected} ref={ref} />;
});

TableRow.displayName = 'TableRow';

TableRow.propTypes = {
    /**
     * Should the `theme.grid.gutterWidth` be taken into account?
     */
    gutter: PropTypes.bool,
    /**
     * A map of action handlers used by rendered components.
     */
    handlers: PropTypes.object,
    /**
     * The data for the current row.
     */
    row: PropTypes.object,
    /**
     * Determine if the table row should stand out from the rest. (be selected)
     */
    selected: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
    /**
     * Apply themed selected color to Row.
     */
    selectedColor: PropTypes.string,
    /**
     * Apply an opacity value to the theme selected color.
     */
    selectedOpacity: PropTypes.number,
    /**
     * If the table row should be zebra styled.
     */
    zebra: PropTypes.bool,
    /**
     * Apply themed zebra color to Row.
     */
    zebraColor: PropTypes.string,
    /**
     * Apply an opacity value to the theme zebra color.
     */
    zebraOpacity: PropTypes.number,
};

TableRow.defaultProps = {
    gutter: false,
    handlers: null,
    row: null,
    selected: false,
    selectedColor: 'warning',
    selectedOpacity: 0.05,
    zebra: false,
    zebraColor: 'muted',
    zebraOpacity: 0.1,
};

export default TableRow;
