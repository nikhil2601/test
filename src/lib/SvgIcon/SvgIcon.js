import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { themeGet } from 'utils/theme';
import { renderPaletteColor } from 'utils/css';
import { renderStyle } from 'utils/styled';
import { responsiveProptypes } from 'utils/proptypes';

const SvgIcon = styled.svg.attrs(props => ({
    'aria-hidden': props.titleAccess ? 'false' : 'true',
    focusable: 'false',
}))`
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('SvgIcon.styles')};
    /**
     * Add in dynamic styles
     */
    ${({ color, currentColor, height, margin, opacity, padding, theme, width, extraCss }) => css`
        display: inline-block;
        fill: currentColor;
        flex-shrink: 0;
        transition: all 1s ease-in-out;
        user-select: none;
        ${renderStyle(
            'color',
            color || 'inherit',
            theme,
            false,
            renderPaletteColor('color', 'color')
        )};
        ${renderStyle('height', height, theme)};
        ${renderStyle('margin', margin, theme)};
        ${renderStyle('opacity', opacity, theme)};
        ${renderStyle('padding', padding, theme)};
        ${renderStyle('width', width, theme)};
    `};

    ${({ extraCss }) => {
        return {
            ...extraCss,
        };
    }}
`;

SvgIcon.propTypes = {
    /**
     * Children passed into the SvgIcon.
     */
    children: PropTypes.node,
    /**
     * Set the color of the SvgIcon.
     */
    color: PropTypes.string,
    /**
     * Defines the 'height' style property.
     */
    height: responsiveProptypes(PropTypes.string),
    /**
     * Defines the 'margin' style property.
     */
    margin: responsiveProptypes(PropTypes.string),
    /**
     * Defines the 'opacity' style property.
     */
    opacity: responsiveProptypes(PropTypes.number),
    /**
     * Defines the 'padding' style property.
     */
    padding: responsiveProptypes(PropTypes.string),
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess: PropTypes.string,
    /**
     * The viewBox attribute defines the position and dimension,
     * in user space, of an SVG viewport.
     * The value of the viewBox attribute is a list of four numbers:
     * min-x, min-y, width and height, separated by whitespace and/or a comma,
     * which specify a rectangle in user space which is mapped to the bounds
     * of the viewport established for the associated element.
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
     */
    viewBox: PropTypes.string,
    /**
     * Defines the 'width' style property.
     */
    width: responsiveProptypes(PropTypes.string),
};

SvgIcon.defaultProps = {
    children: null,
    color: 'inherit',
    height: '1rem',
    margin: null,
    opacity: null,
    padding: null,
    titleAccess: null,
    viewBox: '0 0 24 24',
    width: '1rem',
};

export default SvgIcon;
