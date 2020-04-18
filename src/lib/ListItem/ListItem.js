import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { COLORS } from 'constants/colors';
import { themeGet } from 'utils/theme';

const ListItemStyled = styled.li`
    align-items: center;
    box-sizing: border-box;
    display: ${({ display }) => {
        return { display: display || 'flex' };
    }};
    justify-content: flex-start;
    position: relative;
    text-align: left;
    text-decoration: none;
    width: 100%;
    transition: opacity 0.2s ease-in-out, background 0.2s ease-in-out, color 0.2s ease-in-out,
        border-color 0.2s ease-in-out;
    /**
     * Add dynamic styles
     */
    ${({
        active,
        backgroundColor: backgroundColorProps,
        borderColor: borderColorProps,
        borderRadius,
        button,
        color: colorProps,
        dense,
        disabled,
        divider,
        margin,
        padding,
        theme,
    }) => {
        const mutedColor = themeGet(`palette.muted.dark`, COLORS.MUTED);
        const backgroundColor = themeGet(`palette.${backgroundColorProps}.color`, COLORS.MUTED);
        const borderColor = themeGet(`palette.${borderColorProps}.borderColor`, COLORS.MUTED);
        const color = themeGet(`palette.${colorProps}.color`, 'inherit');
        // Define the styles for the `active` state.
        const activeCSS = css`
            background: ${backgroundColor};
            border-color: ${borderColor};
            color: ${color};
        `;
        // Define the styles for the `button` type list item.
        const buttonCSS = css`
            cursor: pointer;
            &:hover {
                background: ${backgroundColor};
                border-color: ${borderColor};
                color: ${color};
            }
        `;
        // Define the styles if we don't want the extra padding.
        const denseCSS = css`
            padding: ${padding || '10px'};
        `;
        // Define the styles for the `disabled` state.
        const disabledCSS = css`
            color: ${mutedColor};
            cursor: not-allowed;
            user-select: none;
            &:hover {
                color: ${mutedColor};
            }
        `;
        // Define the styles if we want to add a border to the list item.
        const dividerCSS = css`
            background-clip: padding-box;
            border-color: ${borderColor};
            border-style: solid;
            border-width: 1px;
            margin-bottom: -1px;
        `;
        // Return the dynamic styles.
        return css`
            color: ${color};
            margin: ${margin};
            padding: ${padding || '12px 20px'};
            &:first-child {
                border-top-left-radius: ${borderRadius};
                border-top-right-radius: ${borderRadius};
            }
            &:last-child {
                border-bottom-left-radius: ${borderRadius};
                border-bottom-right-radius: ${borderRadius};
            }
            ${divider && dividerCSS};
            ${button && buttonCSS};
            ${dense && denseCSS};
            ${active && activeCSS};
            ${disabled && disabledCSS};
        `;
    }};
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('ListItem.styles')};
`;

/**
 * Items to be rendered inside a List.
 *
 * @method      ListItem
 * @constructor
 */
const ListItem = React.forwardRef((props, ref) => {
    const { children, ...rest } = props;

    return (
        <ListItemStyled as="li" {...rest} ref={ref}>
            {children}
        </ListItemStyled>
    );
});

ListItem.propTypes = {
    /**
     * If `true`, the list-item will be set to active.
     */
    active: PropTypes.bool,
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
     * Sets the `border-width` css property.
     */
    borderWidth: PropTypes.string,
    /**
     * If `true`, the list-item will be rendered as a button.
     */
    button: PropTypes.bool,
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * Set the color of the ListItem component.
     *
     * Color(s) can be set in `theme.palette`.
     */
    color: PropTypes.string,
    /**
     * If `true`, the list-item will set to disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, a 1px border is added to the bottom of the list-item.
     */
    divider: PropTypes.bool,
    /**
     * Sets the `margin` css property.
     */
    margin: PropTypes.string,
    /**
     * Sets the `padding` css property.
     */
    padding: PropTypes.string,
};

ListItem.defaultProps = {
    active: false,
    backgroundColor: null,
    borderColor: 'muted',
    borderRadius: '0',
    borderWidth: '0',
    button: false,
    children: null,
    color: null,
    disabled: false,
    divider: false,
    margin: '0',
    padding: null,
};

ListItem.displayName = 'ListItem';

export default ListItem;

export { ListItemStyled };
