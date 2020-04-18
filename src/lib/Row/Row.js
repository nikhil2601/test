import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import {
    ALIGN_CONTENT,
    ALIGN_ITEMS,
    DISPLAY,
    FLEX_DIRECTION,
    FLEX_WRAP,
    JUSTIFY_CONTENT,
} from 'constants/grid';
import { filterProps, renderStyle } from 'utils/styled';
import { responsiveProptypes } from 'utils/proptypes';
import { renderRowGutter, verifyCSSValueCurry as verifyCSSValue } from 'utils/css';

/* eslint-disable react/prop-types */
const RowStyled = React.forwardRef((props, ref) => {
    const { tagname } = props;
    return React.createElement(tagname, { ...filterProps(props), ref });
});

RowStyled.displayName = 'RowStyled';
/* eslint-enable */

const Row = styled(RowStyled)`
    box-sizing: border-box;
    /**
     * Dynamic styles
     */
    ${({
        alignContent,
        alignItems,
        direction,
        display,
        flex,
        gutter,
        height,
        justify,
        margin,
        padding,
        theme,
        width,
        wrap,
    }) => {
        return css`
            ${renderStyle('display', display, theme, verifyCSSValue(DISPLAY))};
            ${renderStyle('flex', flex, theme)};
            ${renderStyle('align-content', alignContent, theme, verifyCSSValue(ALIGN_CONTENT))};
            ${renderStyle('align-items', alignItems, theme, verifyCSSValue(ALIGN_ITEMS))};
            ${renderStyle('flex-direction', direction, theme, verifyCSSValue(FLEX_DIRECTION))};
            ${renderStyle('flex-wrap', wrap, theme, verifyCSSValue(FLEX_WRAP))};
            ${renderStyle('gutter', gutter, theme, true, renderRowGutter)};
            ${renderStyle('height', height, theme)};
            ${renderStyle('justify-content', justify, theme, verifyCSSValue(JUSTIFY_CONTENT))};
            ${renderStyle('width', width, theme)};
            ${renderStyle('padding', padding, theme)};
            ${renderStyle('margin', margin, theme)};
        `;
    }};
`;

Row.propTypes = {
    /**
     * Defines the 'align-content' style property.
     */
    alignContent: responsiveProptypes(PropTypes.oneOf(ALIGN_CONTENT)),
    /**
     * The content of the Row.
     */
    children: PropTypes.node,
    /**
     * Defines the 'align-items' style property.
     */
    alignItems: responsiveProptypes(PropTypes.oneOf(ALIGN_ITEMS)),
    /**
     * Defines the 'flex-direction' style property.
     */
    direction: responsiveProptypes(PropTypes.oneOf(FLEX_DIRECTION)),
    /**
     * Defines the 'display' style property.
     */
    display: responsiveProptypes(PropTypes.oneOf(DISPLAY)),
    /**
     * Defines the 'flex' style property.
     */
    flex: responsiveProptypes(PropTypes.string),
    /**
     * Should the `theme.grid.gutterWidth` be taken into account?
     */
    gutter: PropTypes.bool,
    /**
     * Defines the 'height' style property.
     */
    height: responsiveProptypes(PropTypes.string),
    /**
     * Defines the 'justify-content' style property.
     */
    justify: responsiveProptypes(PropTypes.oneOf(JUSTIFY_CONTENT)),
    /**
     * Defines the 'margin' style property.
     */
    margin: responsiveProptypes(PropTypes.string),
    /**
     * Defines the 'padding' style property.
     */
    padding: responsiveProptypes(PropTypes.string),
    /**
     * The html tag or React component to use for the root node.
     */
    tagname: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    /**
     * Defines the 'width' style property.
     */
    width: responsiveProptypes(PropTypes.string),
    /**
     * Defines the 'flex-wrap' style property.
     */
    wrap: responsiveProptypes(PropTypes.oneOf(FLEX_WRAP)),
};

Row.defaultProps = {
    alignContent: null,
    alignItems: null,
    children: null,
    direction: 'row',
    display: 'flex',
    flex: '0 1 auto',
    gutter: true,
    height: null,
    justify: null,
    margin: null,
    padding: null,
    tagname: 'div',
    width: 'auto',
    wrap: 'wrap',
};

export default Row;
