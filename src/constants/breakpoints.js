/**
 * List of responsive breakpoint keys in order.
 * i.e extra-small, small, medium, large, extra-large
 *
 * @type {Array}
 */
export const KEYS = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 * Map of the responsive breakpoint keys along with their values
 *
 * @type {Object}
 */
export const VALUES = {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1200,
};

/**
 * The units for computing the breakpoints
 *
 * @type {String}
 */
export const UNIT = 'px';

/**
 * The steps to take when downshifting from breakpoints
 *
 * @type {Number}
 */
export const STEP = 2 / 100;
