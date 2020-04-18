import { createDirectionalShadows } from 'utils/shadows';
import { createTransitions } from 'utils/transitions';
import { generateMedia } from 'utils/media';

import { darken } from 'polished';
import { KEYS, VALUES, UNIT } from './breakpoints';
import { COLORS, PALETTE } from './colors';
import { CSS_EFFECTS } from './effects';
import { GRID } from './grid';
import { TYPOGRAPHY } from './typography';

/**
 * Create breakpoints for the current theme
 *
 * @method createBreakpoints
 * @return {Object}          The map containing all of the breakpoint functions and values.
 */
export const createBreakpoints = () => ({
    keys: KEYS,
    unit: UNIT,
    values: VALUES,
});

/**
 * The default theme for the application
 *
 * @type {Object}
 */
export const THEME = {
    // build the breakpoints and its utilities
    breakpoints: createBreakpoints(),
    // define the set of default colors
    colors: COLORS,
    // build the CSS in JS transitions / effects
    effects: CSS_EFFECTS,
    // build the grid properties
    grid: GRID,
    // build the media utilities
    media: generateMedia(),
    // build the color palette
    palette: PALETTE,
    // build the transitions utilities
    transitions: createTransitions(),
    // build the typographic styles
    typography: TYPOGRAPHY,
    // build the shadows
    shadows: createDirectionalShadows(),
    DescriptionField: {
        styles: {
            root: {
                padding: '0 0 5px',
                borderBottom: `1px solid ${COLORS.DIVIDER}`,
                marginBottom: '10px !important',
            },
        },
    },
    TitleField: {
        styles: {
            root: {
                color: COLORS.BLACK,
                fontSize: '20px',
                marginLeft: 0,
            },
        },
    },
    TableRow: {
        styles: {
            backgroundColor: COLORS.WHITE,
            selected: {
                backgroundColor: '#E1E5E9',
            },
            zebra: {
                backgroundColor: '#FAFAFA',
            },
        },
    },
    TableCell: {
        styles: {
            portrait: {
                display: 'flex !important',
                '&:first-of-type': {
                    borderTop: 'none',
                },
            },
        },
        body: {
            styles: {},
        },
        head: {
            styles: {
                backgroundColor: '#f5f8fa',
                borderTop: 'none',
                color: '#6C8193',
                fontSize: '14px',
                padding: '10px',
            },
        },
        sortable: {
            styles: {
                backgroundColor: '#f5f8fa',
                borderTop: 'none',
                color: '#6C8193',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '10px',
            },
        },
    },
    ImpersonateUserHeader: {
        styles: {
            backgroundColor: 'white',
            color: '#333',
            fontSize: '18px',
            padding: '0px 20px',
        },
        height: 62,
    },
    AppNavigation: {
        styles: {
            backgroundColor: 'white',
        },
        height: 62,
    },
    SubNavItem: {
        styles: {
            color: COLORS.AZURE,
            '&:active': {
                color: darken(0.15, COLORS.AZURE),
            },
            '&:hover': {
                color: darken(0.15, COLORS.AZURE),
            },
        },
        active: {
            borderBottomColor: COLORS.AZURE,
        },
    },
};
