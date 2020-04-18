import { darken } from 'polished';

import { RAVEN_COLORS } from 'pep-comp';
import pepcusLogo from 'demo/static/images/pepcus.jpg';

/**
 * The default theme for the application
 *
 * @type {Object}
 */
const APP_THEME = {
    grid: {
        gutterWidth: 20,
    },
    AppNav: {
        styles: {
            backgroundColor: RAVEN_COLORS.PRIMARY,
            color: RAVEN_COLORS.WHITE,
        },
    },
    NavItem: {
        styles: {
            backgroundColor: 'transparent',
            color: RAVEN_COLORS.WHITE,
            '&:active': {
                color: RAVEN_COLORS.WHITE,
                backgroundColor: darken(0.3, RAVEN_COLORS.PRIMARY),
            },
            '&:hover': {
                backgroundColor: darken(0.2, RAVEN_COLORS.PRIMARY),
                color: RAVEN_COLORS.WHITE,
            },
        },
        active: {
            backgroundColor: darken(0.2, RAVEN_COLORS.PRIMARY),
            color: RAVEN_COLORS.WHITE,
        },
    },
    NavLogo: {
        alt: 'Pepcus logo',
        darkURL: pepcusLogo,
        lightURL: pepcusLogo,
        theme: 'light',
    },
};

export default APP_THEME;
