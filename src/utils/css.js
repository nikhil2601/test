import { getThemeProps } from './theme';

/**
 * Calculate the width based on the given column count
 *
 * @method _calcWidth
 * @private
 * @param  {number}   width       The desired width
 * @param  {number}   columnCount The total number of column count
 * @return {number}
 */
const _calcWidth = (width, columnCount) => Math.round((width / columnCount) * 10e6) / 10e4;

/**
 * Round the given `gutterWidth` to the nearest even number.
 * We need to round the `gutterWidth` to evenly space and spread the spacing
 * around the `<Row />` and `<Col />`.
 *
 * @method _roundGutterWidth
 * @private
 * @param  {number}          gutterWidth The current gutter width
 * @return {number}
 */
const _roundGutterWidth = gutterWidth => 2 * Math.round(gutterWidth / 2);

/**
 * Verify a CSS valule exists within a given list of allowed values, via a 'curry' fn.
 *
 * @method verifyCSSValueCurry
 * @param  {Array}             allowedList The list of allowed values
 * @return {Function}
 */
export const verifyCSSValueCurry = allowedList => value => allowedList.includes(value);

/**
 * Verify a given CSS value for the 'flex-order' property.
 *
 * @method verifyCSSFlexOrder
 * @param  {string}           value The value to verify
 * @return {boolean}
 */
export const verifyCSSFlexOrder = value =>
    Boolean(!Number.isNaN(value) && typeof value === 'number');

/**
 * Verify a given CSS column size, based on the defined `columnCount`
 *
 * @method verifyCSSColSize
 * @param  {string}         value The CSS value to verify
 * @param  {string}         name  The CSS property name
 * @param  {Object}         theme The current theme
 * @return {boolean}
 */
export const verifyCSSColSize = (value, name, theme) => {
    // Extract the defined colum count from the theme
    const columnCount = getThemeProps('grid.columns', 12, { theme });
    // If the value is a number, then:
    // 1. Should be greater than `1`.
    // 2. Should be less than the defined `columnCount` or `12`.
    if (typeof value === 'number' && !Number.isNaN(value)) {
        return Boolean(value >= 1 && value <= columnCount);
    }
    // The value is either a `string` or a `boolean` value.
    return typeof value === 'string' || typeof value === 'boolean';
};

/**
 * Calculate the CSS table cell size based on the given `columnCount` from the theme.
 *
 * @method renderTableCellSize
 * @param  {string}            value The CSS value to check
 * @param  {string}            name  The CSS property name (not needed for this method)
 * @param  {Object}            theme The current theme
 * @return {string}
 */
export const renderTableCellSize = (value, name, theme) => {
    // Extract the defined column count from the theme.
    const columnCount = getThemeProps('grid.columns', 12, { theme });
    // Determine the styles when sizing the table.
    if (typeof value === 'number' && value <= columnCount) {
        // Round to the significant 6 numbers.
        const width = `${_calcWidth(value, columnCount)}%`;
        // Determine the styles for the numerical table size.
        return `
            width: ${width};
        `;
    } else if (typeof value === 'number') {
        return `
            width: ${value}px;
        `;
    } else if (typeof value === 'string') {
        return `
            width: ${value};
        `;
    }
    // Return empty string otherwise.
    return '';
};

/**
 * Calculate the CSS column size based on the given `columnCount` from the theme.
 *
 * @method renderCSSColSize
 * @param  {string}         value The CSS value to check
 * @param  {string}         name  The CSS property name (not needed for this method)
 * @param  {Object}         theme The current theme
 * @return {string}
 */
export const renderCSSColSize = (value, name, theme) => {
    // Extract the defined column count from the theme.
    const columnCount = getThemeProps('grid.columns', 12, { theme });
    // Determine the styles when sizing the column.
    if (value === '*') {
        return `
            flex-basis: 0;
            flex-grow: 1;
            max-width: 100%;
        `;
    }
    // Determine the styles for setting the column size to `auto`.
    if (value === 'auto') {
        return `
            flex-basis: auto;
            flex-grow: 0;
            max-width: none;
        `;
    }
    // Determine the defined numerical column size.
    if (typeof value === 'number') {
        // Round to the significant 6 numbers.
        const width = `${_calcWidth(value, columnCount)}%`;
        // Determine the styles for the numerical column size.
        return `
            flex-basis: ${width};
            flex-grow: 0;
            max-width: ${width};
        `;
    }
    // Pass in a string value, useful for '50%' type values.
    if (typeof value === 'string') {
        return `
            flex-basis: ${value};
            flex-grow: 0;
            max-width: ${value};
        `;
    }
    // Return empty string otherwise.
    return '';
};

/**
 * Render a gutter for the `Row`
 *
 * @method renderRowGutter
 * @param  {string}        value The CSS value to render
 * @param  {string}        name  The CSS property name
 * @param  {Object}        theme The current theme
 * @return {string}
 */
export const renderRowGutter = (value, name, theme) => {
    const gutterWidth = _roundGutterWidth(getThemeProps('grid.gutterWidth', 0, { theme }));

    return `
        margin-left: -${gutterWidth / 2}px;
        margin-right: -${gutterWidth / 2}px;
    `;
};

/**
 * Render a gutter for the `Col`
 *
 * @method renderColumnGutter
 * @param  {string}           value The CSS value to render
 * @param  {string}           name  The CSS property name
 * @param  {Object}           theme The current theme
 * @return {string}
 */
export const renderColumnGutter = (value, name, theme) => {
    const gutterWidth = _roundGutterWidth(getThemeProps('grid.gutterWidth', 0, { theme }));

    return `
        padding-left: ${gutterWidth / 2}px;
        padding-right: ${gutterWidth / 2}px;
    `;
};

/**
 * Render a left offset for a styled component
 *
 * @method renderLeftOffset
 * @param  {string}         value The CSS value to render
 * @param  {string}         name  The CSS property name
 * @param  {Object}         theme The current theme
 * @return {string}
 */
export const renderLeftOffset = (value, name, theme) => {
    // Extract the defined column count from the theme.
    const columnCount = getThemeProps('grid.columns', 12, { theme });
    // Only render an offset if the value is a `number`,
    // and less than the given `columnCount`.
    if (typeof value === 'number' && value <= columnCount) {
        return `
            margin-left: ${_calcWidth(value, columnCount)}%;
        `;
    }
    // Return an empty string otherwise.
    return '';
};

/**
 * Render a right offset for a styled component
 *
 * @method renderRightOffset
 * @param  {string}          value The CSS value to render
 * @param  {string}          name  The CSS property name
 * @param  {Object}          theme The current theme
 * @return {string}
 */
export const renderRightOffset = (value, name, theme) => {
    // Extract the defined column count from the theme.
    const columnCount = getThemeProps('grid.columns', 12, { theme });
    // Only render an offset if the value is a `number`,
    // and less than the given `columnCount`.
    if (typeof value === 'number' && value <= columnCount) {
        return `
            margin-right: ${_calcWidth(value, columnCount)}%;
        `;
    }
    // Return an empty string otherwise.
    return '';
};

/**
 * Render a color from the palette for a styled-component
 *
 * @method renderPaletteColor
 * @param  {string}           cssProperty The css property name
 * @param  {string}           paletteKey  The key for the paletee.${key}
 * @return {Function}
 */
export const renderPaletteColor = (cssProperty, paletteKey) => (value, name, theme) => {
    // Extract the color from the theme palette.
    const color = getThemeProps(`palette.${value}.${paletteKey}`, value, { theme });
    // Only return the found color if `cssProperty` is present.
    if (cssProperty) {
        return `
        ${cssProperty}: ${color};
    `;
    }
    // Return an empty string otherwise.
    return '';
};

/**
 * Render a typographic style for a styled-component
 *
 * @method renderTypographyType
 * @param  {string}             value The CSS value to render
 * @param  {string}             name  The CSS property name
 * @param  {Object}             theme The current theme
 * @return {string}
 */
export const renderTypographyType = (value, name, theme) => {
    // Extract the typography styles from the theme.
    const type = getThemeProps(`typography.${value}`, null, { theme });
    // If the styles and value are present.
    if (type && value) {
        return type;
    }
    // Return an empty string otherwise.
    return '';
};
