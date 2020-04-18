/**
 * Define a set of typographic rules for the theme.
 *
 * @type {Object}
 */
export const TYPOGRAPHY = {
    mapping: {
        body: 'p',
        caption: 'span',
        headline: 'h1',
        label: 'label',
        link: 'a',
        separator: 'span',
        subheading: 'h3',
        title: 'h2',
    },
    root: {
        fontFamily: "'Helvetica', 'Arial', sans-serif",
        fontSize: '14px',
        fontWeight: 400,
        marginBottom: '5px',
    },
    label: {
        cursor: 'pointer',
    },
    fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 600,
        black: 800,
    },
    display4: {
        fontSize: '7rem',
        fontWeight: 300,
        lineHeight: '1.1',
        marginLeft: '-0.7rem',
    },
    display3: {
        fontSize: '3.5rem',
        fontWeight: 400,
        lineHeight: '1.3',
        marginLeft: '-0.3rem',
    },
    display2: {
        fontSize: '2.8rem',
        fontWeight: 400,
        lineHeight: '1',
        marginLeft: '-0.2rem',
    },
    display1: {
        fontSize: '2.125rem',
        fontWeight: 400,
        lineHeight: '1.2',
        marginLeft: '-0.1rem',
    },
    headline: {
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: '1.3',
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 500,
        lineHeight: '1.2',
    },
    subheading: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.5',
    },
    body: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.5',
    },
    caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: '1.35',
    },
    captionBold: {
        fontSize: '0.75rem',
        fontWeight: 600,
        lineHeight: '1.35',
    },
    button: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: '1',
    },
    link: {
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.5',
    },
    paginationLabel: {
        fontWeight: 300,
    },
    paginationTotalSelected: {
        fontSize: '11px',
        textTransform: 'uppercase',
    },
    required: {
        fontWeight: 400,
        fontSize: '12px',
        textTransform: 'uppercase',
    },
    titleField: {
        color: '#848484',
        fontSize: '14px',
        fontWeight: 400,
        margin: '0 0 10px 15px',
        padding: 0,
    },
    pre: {
        display: 'inline',
        fontFamily: 'monospace',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '1.3',
    },
};
