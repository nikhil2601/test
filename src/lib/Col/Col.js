import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { createElement, forwardRef } from 'react';

import { ALIGN_SELF } from 'constants/grid';
import { filterProps, renderStyle } from 'utils/styled';
import { responsiveProptypes } from 'utils/proptypes';
import {
    renderCSSColSize,
    renderColumnGutter,
    renderLeftOffset,
    renderRightOffset,
    verifyCSSColSize,
    verifyCSSFlexOrder,
    verifyCSSValueCurry,
} from 'utils/css';

/* eslint-disable react/prop-types */
const ColStyled = forwardRef((props, ref) => {
    const { tagname } = props;
    return createElement(tagname, { ...filterProps(props), ref });
});

ColStyled.displayName = 'ColStyled';
/* eslint-enable */

const Col = styled(ColStyled)`
    /**
     * Default styles
     */
    box-sizing: border-box;
    flex: 0 0 auto;
    /**
     * Dynamic Styles
     */
    ${({
        alignSelf,
        display,
        flex,
        gutter,
        leftOffset,
        margin,
        order,
        padding,
        rightOffset,
        size,
        theme,
    }) => {
        return css`
            ${renderStyle('display', display, theme)};
            ${renderStyle('size', size, theme, verifyCSSColSize, renderCSSColSize)};
            ${renderStyle('gutter', gutter, theme, true, renderColumnGutter)};
            ${renderStyle('align-self', alignSelf, theme, verifyCSSValueCurry(ALIGN_SELF))};
            ${renderStyle('flex', flex, theme)};
            ${renderStyle('order', order, theme, verifyCSSFlexOrder)};
            ${renderStyle('leftOffset', leftOffset, theme, true, renderLeftOffset)};
            ${renderStyle('rightOffset', rightOffset, theme, true, renderRightOffset)};
            ${renderStyle('padding', padding, theme)};
            ${renderStyle('margin', margin, theme)};
        `;
    }};
`;

Col.propTypes = {
    /**
     * Defines the 'align-content' style property.
     */
    alignSelf: responsiveProptypes(PropTypes.oneOf(ALIGN_SELF)),
    /**
     * The content of the Col.
     */
    children: PropTypes.node,
    /**
     * Defines the 'flex' style property.
     */
    flex: responsiveProptypes(PropTypes.oneOfType([PropTypes.string])),
    /**
     * Should the `theme.grid.gutterWidth` be taken into account?
     */
    gutter: PropTypes.bool,
    /**
     * Add an offset `margin` to the left of the Col.
     */
    leftOffset: responsiveProptypes(PropTypes.oneOfType([PropTypes.bool, PropTypes.number])),
    /**
     * Defines the 'margin' style property.
     */
    margin: responsiveProptypes(PropTypes.string),
    /**
     * Defines the 'flex-order' style property.
     */
    order: responsiveProptypes(PropTypes.number),
    /**
     * Defines the 'padding' style property.
     */
    padding: responsiveProptypes(PropTypes.string),
    /**
     * Add an offset `margin` to the right of the Col.
     */
    rightOffset: responsiveProptypes(PropTypes.oneOfType([PropTypes.bool, PropTypes.number])),
    /**
     * Specifies the size of the `column`.
     * Can be set to `auto` for an auto-sizing.
     * Can be set to `*` for sizing the `column` as normal. (default)
     * Can be set to any number from `1 - n` (n being the `theme.grid.column` size).
     * Can be set to an object for responsive styling. `{{ sm: 6, lg: 12 }}`
     */
    size: responsiveProptypes(
        PropTypes.oneOfType([
            PropTypes.oneOf(['auto', '*', false]),
            PropTypes.number,
            PropTypes.string,
        ])
    ),
    /**
     * The html tag or React component to use for the root node.
     */
    tagname: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
};

Col.defaultProps = {
    alignSelf: null,
    children: null,
    flex: null,
    gutter: true,
    leftOffset: null,
    margin: null,
    order: null,
    padding: null,
    rightOffset: null,
    size: '*',
    tagname: 'div',
};

export default Col;
