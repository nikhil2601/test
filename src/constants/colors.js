import { darken, lighten, rgba } from 'polished';

/**
 * Define a set of ROOT_COLORS,
 * that the rest of the colors will be built off of.
 *
 * @type {Object}
 */
const ROOT_COLORS = {
    AZURE: '#1E95EE',
    BLACK: '#000000',
    DARK: '#2D2D2D',
    DARKER: '#1A1A1A',
    ERROR: '#E62C14',
    FOCUS: rgba('#1E95EE', 0.5),
    GOLD: '#DFBB0B',
    INPUT: '#1E1E1E', // => darken(0.8, '#EAEAEA'),
    INPUT_DISABLED: '#E1E5E9',
    LIGHT: '#7F8FA4',
    LIGHTER: '#E6EAEE',
    LIGHT_2: '#A6B3BE',
    MUTED: '#EAEAEA',
    ORCHID: '#B86DC9',
    PLACEHOLDER: '#9E9E9E', // => darken(0.3, '#EAEAEA'),
    PRE_ADDED: '#6BDFB8',
    PRE_DELETED: '#FF8983',
    PRIMARY: '#114E8F',
    SECONDARY: '#2DA1F8',
    SUCCESS: '#2DA438',
    TEXT: '#848484',
    TOOLBAR: '#F4F7F9',
    WARNING: '#F57F17',
    WHITE: '#FFFFFF',
};

/**
 * Define a set of default colors for the theme,
 * built on the ROOT_COLORS defined above.
 *
 * @type {Object}
 */
export const COLORS = {
    ...ROOT_COLORS,
    ACTIVE: rgba(ROOT_COLORS.BLACK, 0.54),
    DISABLED: rgba(ROOT_COLORS.BLACK, 0.26),
    DISABLED_BG: rgba(ROOT_COLORS.BLACK, 0.12),
    // DIVIDER           : rgba(ROOT_COLORS.BLACK, 0.2),
    DIVIDER: ROOT_COLORS.MUTED,
    HOVER: rgba(ROOT_COLORS.BLACK, 0.08),
    SELECTED: rgba(ROOT_COLORS.BLACK, 0.14),
    TEXT_DARK: darken(0.3, ROOT_COLORS.MUTED),
    PRIMARY_GRADIENT: `linear-gradient(to top, ${ROOT_COLORS.PRIMARY}, #0C60A1)`,
    SECONDARY_GRADIENT: `linear-gradient(to top, #1991EB, ${ROOT_COLORS.SECONDARY})`,
    WARNING_GRADIENT: `linear-gradient(to bottom, #F9AB44, #F9AB44 1%, ${ROOT_COLORS.WARNING})`,
    ERROR_GRADIENT: `linear-gradient(to bottom, #CE1C32, #FF5267 1%, ${ROOT_COLORS.ERROR})`,
    SUCCESS_GRADIENT: `linear-gradient(to bottom, ${lighten(0.2, ROOT_COLORS.SUCCESS)}, ${
        ROOT_COLORS.SUCCESS
    })`,
    LIGHT_GRADIENT: `linear-gradient(to bottom, ${ROOT_COLORS.LIGHT}, ${darken(
        0.2,
        ROOT_COLORS.LIGHT
    )})`,
    PAGINATION_BUTTON_GRADIENT: `linear-gradient(to top, #f2f4f7, #ffffff)`,
};

/**
 * Define the theme's color palette,
 * built on the COLORS defined above.
 *
 * @type {Object}
 */
export const PALETTE = {
    COLORS,
    action: {
        active: COLORS.ACTIVE,
        disabled: COLORS.DISABLED,
        disabledBackground: COLORS.DISABLED_BG,
        hover: COLORS.HOVER,
        hoverOpacity: 0.08,
        selected: COLORS.SELECTED,
    },
    background: {
        color: '#E1E5E9',
        white: COLORS.WHITE,
    },
    common: {
        black: COLORS.BLACK,
        dark: COLORS.DARK,
        darker: COLORS.DARKER,
        divider: COLORS.DIVIDER,
        input: COLORS.INPUT,
        inputDisabled: COLORS.INPUT_DISABLED,
        light: COLORS.LIGHT,
        lighter: COLORS.LIGHTER,
        placeholder: COLORS.PLACEHOLDER,
        toolbar: COLORS.TOOLBAR,
        white: COLORS.WHITE,
    },
    primary: {
        color: COLORS.PRIMARY,
        dark: darken(0.3, COLORS.PRIMARY),
        light: lighten(0.2, COLORS.PRIMARY),
        text: COLORS.WHITE,
        gradientColor: COLORS.PRIMARY_GRADIENT,
        borderColor: COLORS.PRIMARY,
    },
    secondary: {
        color: COLORS.SECONDARY,
        dark: darken(0.3, COLORS.PRIMARY),
        light: lighten(0.2, COLORS.PRIMARY),
        text: COLORS.WHITE,
        gradientColor: COLORS.SECONDARY_GRADIENT,
        borderColor: COLORS.SECONDARY,
    },
    error: {
        color: COLORS.ERROR,
        dark: darken(0.3, COLORS.ERROR),
        light: lighten(0.2, COLORS.ERROR),
        text: COLORS.WHITE,
        gradientColor: COLORS.ERROR_GRADIENT,
        borderColor: COLORS.ERROR,
    },
    warning: {
        color: COLORS.WARNING,
        dark: darken(0.3, COLORS.WARNING),
        light: lighten(0.2, COLORS.WARNING),
        text: COLORS.WHITE,
        gradientColor: COLORS.WARNING_GRADIENT,
        borderColor: COLORS.WARNING,
    },
    success: {
        color: COLORS.SUCCESS,
        dark: darken(0.3, COLORS.SUCCESS),
        light: lighten(0.2, COLORS.SUCCESS),
        text: COLORS.WHITE,
        gradientColor: COLORS.SUCCESS_GRADIENT,
        borderColor: COLORS.SUCCESS,
    },
    dark: {
        color: COLORS.BLACK,
        dark: darken(0.3, COLORS.BLACK),
        light: lighten(0.2, COLORS.BLACK),
        text: COLORS.WHITE,
        gradientColor: COLORS.BLACK,
        borderColor: COLORS.BLACK,
    },
    light: {
        color: COLORS.LIGHT,
        dark: darken(0.3, COLORS.LIGHT),
        light: lighten(0.2, COLORS.LIGHT),
        text: COLORS.WHITE,
        gradientColor: COLORS.LIGHT_GRADIENT,
        borderColor: COLORS.LIGHT,
    },
    white: {
        color: COLORS.WHITE,
        dark: darken(0.3, COLORS.WHITE),
        light: COLORS.WHITE,
        text: COLORS.DARK,
        gradientColor: COLORS.WHITE,
        borderColor: '#DDE1EF',
    },
    link: {
        color: COLORS.PRIMARY,
        dark: darken(0.3, COLORS.PRIMARY),
        light: lighten(0.2, COLORS.PRIMARY),
        text: COLORS.WHITE,
        gradientColor: COLORS.PRIMARY_GRADIENT,
        borderColor: COLORS.PRIMARY,
    },
    muted: {
        color: COLORS.MUTED,
        dark: darken(0.3, COLORS.MUTED),
        light: lighten(0.2, COLORS.MUTED),
        text: COLORS.TEXT,
        gradientColor: COLORS.MUTED,
        borderColor: COLORS.MUTED,
    },
    actions: {
        text: COLORS.DARK,
        gradientColor: '#FAFAFA',
        color: COLORS.PRIMARY_GRADIENT,
        hoverColor: COLORS.WHITE,
        borderColor: COLORS.MUTED,
    },
    checkbox: {
        color: COLORS.PRIMARY,
    },
    paginationButton: {
        text: COLORS.LIGHT,
        gradientColor: COLORS.PAGINATION_BUTTON_GRADIENT,
        color: COLORS.PRIMARY_GRADIENT,
        hoverColor: COLORS.WHITE,
        borderColor: COLORS.MUTED,
    },
    text: {
        color: COLORS.TEXT,
        dark: COLORS.DARK,
        darker: COLORS.DARKER,
        light: COLORS.LIGHT,
        lighter: COLORS.LIGHTER,
    },
    advancedSearch: {
        color: lighten(0.15, COLORS.TEXT),
        dark: darken(0.3, COLORS.MUTED),
        light: lighten(0.2, COLORS.MUTED),
        text: COLORS.TEXT,
        gradientColor: COLORS.MUTED,
        borderColor: COLORS.MUTED,
    },
    notificationViewMoreButton: {
        color: COLORS.TOOLBAR,
        light: lighten(0.2, COLORS.TOOLBAR),
        text: darken(0.7, COLORS.TOOLBAR),
        gradientColor: COLORS.TOOLBAR,
        borderColor: COLORS.TOOLBAR,
        hoverColor: darken(0.4, COLORS.DARK),
    },
    notificationHoverColor: {
        color: darken(0.1, COLORS.TOOLBAR),
    },
    notificationIcon: {
        color: COLORS.WHITE,
    },
    notificationMessage: {
        color: '#114E8F',
    },
    notificationCounter: {
        color: '#E62C14',
    },
    errorAlert: {
        borderColor: '#f5c6cb',
        backgroundColor: '#f8d7da',
        color: '#721c24',
    },
};
