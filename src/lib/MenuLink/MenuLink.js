import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { COLORS } from 'constants/colors';
import { getThemeProps } from 'utils/theme';

const MenuLinkCSS = css`
    background-color: #ffffff;
    clear: both;
    cursor: pointer;
    display: block;
    font-weight: normal;
    line-height: 1.5;
    padding: 6.5px 20px;
    text-decoration: none;
    white-space: nowrap;
    &:hover, &:active {
        text-decoration: none;
    }
    ${({ selected, theme, color: colorProps }) => {
        const background = getThemeProps(
            `palette.${colorProps}.gradientColor`,
            COLORS.PRIMARY_GRADIENT,
            {
                theme,
            }
        );
        const defaultColor = getThemeProps(`palette.${colorProps}.color`, COLORS.PRIMARY, {
            theme,
        });
        const color = getThemeProps(`palette.${colorProps}.text`, COLORS.WHITE, {
            theme,
        });

        return {
            background: selected ? defaultColor : background,
            color,
            '&:hover': {
                background: defaultColor,
            },
            '&:active': {
                background: defaultColor,
            },
            '&:disabled': {
                background: defaultColor,
            },
        };
    }}
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('MenuLink.styles')};
    `;

const MenuLink = ({ component, ...props }) => {
    const cmp = component || 'a';

    const MenuLinkStyled = styled(cmp)`
        ${MenuLinkCSS};
    `;

    return <MenuLinkStyled {...props} />;
};

MenuLink.propTypes = {
    /**
     * The component used for the root node.
     */
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
};

MenuLink.defaultProps = {
    component: 'a',
};

export default MenuLink;
