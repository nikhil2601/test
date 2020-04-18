import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { renderStyle } from 'utils/styled';
import { getThemeProps } from 'utils/theme';
import { renderPaletteColor, renderTypographyType } from 'utils/css';
import { responsiveProptypes } from 'utils/proptypes';

const TypographyCSS = css`
    /**
     * Add the root font-styles from the theme.
     */
    ${getThemeProps('typography.root')};
    /**
     * Add in no-wrap styles by truncating the text.
     */
    ${({ noWrap, noWrapWidth }) =>
        noWrap &&
        css`
            max-width: ${noWrapWidth || '98%'};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
        `};
    /**
     * 
     */
    ${({ wordWrap }) =>
        wordWrap &&
        css`
            overflow-wrap: break-word;
            word-wrap: break-word;
        `};
    /**
     * Add dynamic gutters (margins).
     */
    ${({
        align,
        backgroundColor: bgColor,
        color,
        fontFamily,
        fontSize,
        fontStyle,
        fontWeight,
        fullWidth,
        gutterBottom,
        gutterLeft,
        gutterRight,
        gutterTop,
        lineHeight,
        padding,
        theme,
        type,
    }) => css`
        ${renderStyle(
            'background-color',
            bgColor,
            theme,
            false,
            renderPaletteColor('background-color', 'color')
        )};
        ${renderStyle('display', fullWidth ? 'block' : '', theme)};
        ${renderStyle('color', color, theme, false, renderPaletteColor('color', 'color'))};
        ${renderStyle('text-align', align)};
        ${renderStyle('margin-bottom', gutterBottom, theme)};
        ${renderStyle('margin-left', gutterLeft, theme)};
        ${renderStyle('margin-right', gutterRight, theme)};
        ${renderStyle('margin-top', gutterTop, theme)};
        ${renderStyle('padding', padding)};
        ${renderStyle('type', type, theme, false, renderTypographyType)};
        ${renderStyle('font-family', fontFamily)};
        ${renderStyle('font-size', fontSize)};
        ${renderStyle('font-style', fontStyle)};
        ${renderStyle('font-weight', fontWeight)};
        ${renderStyle('line-height', lineHeight)};
    `};
`;

const Typography = props => {
    const { theme, type } = props;
    // Find the mapping for the given type style.
    const headlineMapping = getThemeProps('typography.mapping', null, { theme });
    // Determine the tagname to use for the HTML element.
    const tagName = headlineMapping[type] || 'span';
    // Build the component with the given tagname.
    const Type = styled(tagName)`
        ${TypographyCSS};
    `;
    // Return the newly created component, with all the props.
    return <Type {...props} tagName={tagName} />;
};

Typography.propTypes = {
    /**
     * The text-align property of the component.
     */
    align: responsiveProptypes(PropTypes.oneOf(['left', 'center', 'right', 'justify'])),
    /**
     * Set the background-color of the typography component.
     *
     * Color(s) can be set in `theme.palette`.
     */
    backgroundColor: responsiveProptypes(PropTypes.string),
    /**
     * Set the color of the typography component.
     *
     * Color(s) can be set in `theme.palette`.
     */
    color: responsiveProptypes(PropTypes.string),
    /**
     * Sets the `font-family` css property.
     */
    fontFamily: responsiveProptypes(PropTypes.string),
    /**
     * Sets the `font-size` css property.
     */
    fontSize: responsiveProptypes(PropTypes.string),
    /**
     * Sets the `font-style` css property.
     */
    fontStyle: responsiveProptypes(PropTypes.string),
    /**
     * Sets the `font-weight` css property.
     */
    fontWeight: responsiveProptypes(PropTypes.string),
    /**
     * Sets the `display` CSS property to 'block'.
     * Helpful if wanting a full-width Typography component.
     */
    fullWidth: responsiveProptypes(PropTypes.bool),
    /**
     * Add a gutter to the bottom of the Typography.
     */
    gutterBottom: responsiveProptypes(PropTypes.string),
    /**
     * Add a gutter to the left of the Typography.
     */
    gutterLeft: responsiveProptypes(PropTypes.string),
    /**
     * Add a gutter to the right of the Typography.
     */
    gutterRight: responsiveProptypes(PropTypes.string),
    /**
     * Add a gutter to the top of the Typography.
     */
    gutterTop: responsiveProptypes(PropTypes.string),
    /**
     * Sets the `line-height` css property.
     */
    lineHeight: responsiveProptypes(PropTypes.string),
    /**
     * Set to `true` to enable truncation with an ellipsis.
     */
    noWrap: PropTypes.bool,
    /**
     * Set the `max-width` for the truncation.
     */
    noWrapWidth: PropTypes.string,
    /**
     * Sets the `padding` css property.
     */
    padding: responsiveProptypes(PropTypes.string),
    theme: PropTypes.object,
    /**
     * Apply the themed typography styles.
     */
    type: responsiveProptypes(PropTypes.string),
    /**
     * Determine if the text should wrap around the container area.
     */
    wordWrap: PropTypes.bool,
};

Typography.defaultProps = {
    align: null,
    backgroundColor: null,
    color: null,
    fontFamily: null,
    fontSize: null,
    fontStyle: null,
    fontWeight: null,
    fullWidth: false,
    gutterBottom: '8px',
    gutterLeft: null,
    gutterRight: null,
    gutterTop: null,
    lineHeight: null,
    noWrap: false,
    noWrapWidth: null,
    padding: null,
    theme: null,
    type: 'body',
    wordWrap: false,
};

export default Typography;
