/**
 * The default grid sizes, to be merged with 'XX' number of columns chosen by theme
 *
 * @type {Array}
 */
export const GRID_SIZES = ['auto', true];

/**
 * Map of the responsive breakpoint keys along with their gutter values
 *
 * @type {Object}
 */
export const GUTTER = {
    xs: '10px',
    sm: '10px',
    md: '20px',
    lg: '20px',
    xl: '20px',
};

/**
 * List of available css display values
 *
 * @type {Array}
 */
export const DISPLAY = [
    'block',
    'inline',
    'table',
    'flex',
    'grid',
    'none',
    'inline-block',
    'inline-flex',
    'inline-grid',
];

/**
 * List of available css 'justify-content' values
 *
 * @type {Array}
 */
export const JUSTIFY_CONTENT = [
    'center',
    'flex-end',
    'flex-start',
    'normal',
    'space-around',
    'space-between',
    'space-evenly',
];

/**
 * List of available css 'align-items' values
 *
 * @type {Array}
 */
export const ALIGN_ITEMS = ['baseline', 'center', 'flex-end', 'flex-start', 'normal', 'stretch'];

/**
 * List of available css 'align-content' values
 *
 * @type {Array}
 */
export const ALIGN_CONTENT = [
    'center',
    'end',
    'flex-end',
    'flex-start',
    'normal',
    'start',
    'stretch',
];

/**
 * List of available css 'align-content' values
 *
 * @type {Array}
 */
export const ALIGN_SELF = ['baseline', 'center', 'flex-end', 'flex-start', 'normal', 'stretch'];

/**
 * List of available css 'flex-direction' values
 *
 * @type {Array}
 */
export const FLEX_DIRECTION = ['row', 'row-reverse', 'column', 'column-reverse'];

/**
 * List of available css 'flex-wrap' values
 *
 * @type {Array}
 */
export const FLEX_WRAP = ['nowrap', 'wrap', 'wrap-reverse'];

/**
 * Define the set of grid properties for the theme.
 *
 * @type {Object}
 */
export const GRID = {
    columns: 12,
    gutterWidth: 15,
    spacing: 8,
};
