import { css } from 'styled-components';

import { VALUES, UNIT } from 'constants/breakpoints';

import { getBreakpointSize } from './breakpoints';

/**
 * Generate multiple media templates for styled-component's css.
 *
 * @method generateMedia
 * @param  {Object}      [breakpoints=VALUES] A map of breakpoint values
 * @return {Object}
 */
export const generateMedia = (breakpoints = VALUES) => {
    /**
     * Breakpoint for a size and below, i.e. max-width: 640px
     *
     * @method down
     * @param  {string} key The key to target for the breakpoint
     * @return {Array}
     */
    const down = key => (...args) => css`
        @media (max-width: ${getBreakpointSize(key, breakpoints) - 0.02}${UNIT}) {
            ${css(...args)};
        }
    `;
    /**
     * Breakpoint for a size and above, i.e. min-width: 641px
     *
     * @method up
     * @param  {string} key The key to target for the breakpoint
     * @return {Array}
     */
    const up = key => (...args) => css`
        @media (min-width: ${getBreakpointSize(key, breakpoints)}${UNIT}) {
            ${css(...args)};
        }
    `;
    /**
     * Breakpint for in-between two keys, i.e. min-width: 641px and max-width: 768px
     *
     * @method between
     * @param  {string} start The start key to target for the breakpoint
     * @param  {string} end   The end key to target for the breakpoint
     * @return {Array}
     */
    const between = (start, end) => (...args) => css`
        @media (
            min-width: ${getBreakpointSize(start, breakpoints)}${UNIT}
            and
            max-width: ${getBreakpointSize(end, breakpoints) - 0.02}${UNIT}
        ) {
            ${css(...args)}
        }
    `;
    // Return the 3 tagged template literal functions
    return {
        between,
        down,
        up,
    };
};

/**
 * A helper object with already generated media templates, based on default theme.
 *
 * @type {Object}
 */
export const media = generateMedia(VALUES);
