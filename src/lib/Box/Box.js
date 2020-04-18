import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { themeGet } from 'utils/theme';

const BoxCSS = css`
    background-color: ${themeGet('palette.common.white')};
    border-color: ${themeGet('palette.common.lighter')};
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('Box.styles')};
    /**
     * Add in dynamic styles
     */
    ${({
        backgroundColor,
        borderColor,
        borderRadius,
        borderStyle,
        borderWidth,
        boxShadow,
        elevation,
        elevationDirection,
        height,
        margin,
        maxHeight,
        maxWidth,
        overflow,
        padding,
        position,
        width,
    }) => css`
        background-color: ${themeGet(`palette.${backgroundColor}.color`, backgroundColor)};
        border-color: ${themeGet(`palette.${borderColor}.color`, borderColor)};
        border-radius: ${borderRadius || '4px'};
        border-style: ${borderStyle || 'solid'};
        border-width: ${borderWidth || '1px'};
        box-shadow: ${themeGet(`shadows[${elevationDirection}][${elevation}]`, boxShadow)};
        height: ${height || null};
        margin: ${margin || '0 0 15px 0'};
        max-height: ${maxHeight || null};
        max-width: ${maxWidth || null};
        overflow: ${overflow || null};
        padding: ${padding || '16px 12px'};
        position: ${position};
        width: ${width || null};
    `};
`;

const Box = styled.div`
    ${BoxCSS};
`;

Box.propTypes = {
    /**
     * Sets the `background-color` css property.
     */
    backgroundColor: PropTypes.string,
    /**
     * Sets the `border-color` css property.
     */
    borderColor: PropTypes.string,
    /**
     * Sets the `border-radius` css property.
     */
    borderRadius: PropTypes.string,
    /**
     * Sets the `border-style` css property.
     */
    borderStyle: PropTypes.string,
    /**
     * Sets the `border-width` css property.
     */
    borderWidth: PropTypes.string,
    /**
     * Sets the `box-shadow` css property.
     */
    boxShadow: PropTypes.string,
    /**
     * Shadow depth for the box.
     * Accepts values between 0 and 24.
     */
    elevation: PropTypes.number,
    /**
     * Direction for the shadow depth for the box.
     * Accepts either `top` or `bottom`.
     */
    elevationDirection: PropTypes.oneOf(['top', 'bottom']),
    /**
     * Sets the `height` css property.
     */
    height: PropTypes.string,
    /**
     * Sets the `margin` css property.
     */
    margin: PropTypes.string,
    /**
     * Sets the `max-height` css property.
     */
    maxHeight: PropTypes.string,
    /**
     * Sets the `max-width` css property.
     */
    maxWeight: PropTypes.string,
    /**
     * Sets the `overflow` css property.
     */
    overflow: PropTypes.string,
    /**
     * Sets the `padding` css property.
     */
    padding: PropTypes.string,
    /**
     * Sets the `position` css property.
     */
    position: PropTypes.string,
    /**
     * Sets the `width` css property.
     */
    width: PropTypes.string,
};

Box.defaultProps = {
    backgroundColor: null,
    borderColor: null,
    borderRadius: null,
    borderStyle: null,
    borderWidth: null,
    boxShadow: null,
    elevation: 0,
    elevationDirection: 'bottom',
    height: null,
    margin: null,
    maxHeight: null,
    maxWidth: null,
    overflow: null,
    padding: null,
    position: null,
    width: '100%',
};

export default Box;
