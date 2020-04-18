import { rgba } from 'polished';

import { COLORS } from './colors';

/**
 * Build a set of default effects for the theme
 * NOTE: These effects are pure CSS transitions / effects, written in JS.
 *
 * @type {Object}
 */
export const CSS_EFFECTS = {
    inputFocus: {
        '&:focus': {
            outline: 'none',
            borderColor: COLORS.PRIMARY,
            boxShadow: `inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px ${rgba(COLORS.PRIMARY, 0.6)}`,
        },
    },
};
