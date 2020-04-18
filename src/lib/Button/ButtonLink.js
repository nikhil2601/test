import PropTypes from 'prop-types';
import styled from 'styled-components';

import { THEME } from 'constants/theme';
import { getThemeProps } from 'utils/theme';

const ButtonLink = styled.a`
    color: ${({ theme, color }) =>
        getThemeProps(`palette.${color}.color`, THEME.palette.primary.color, { theme })};
    cursor: pointer;
    text-decoration: none;
    transition: color 0.15s ease-in-out;
    &:hover {
        color: ${({ theme, color }) =>
            getThemeProps(`palette.${color}.light`, THEME.palette.primary.light, { theme })};
        text-decoration: underline;
    }
    &:active {
        color: ${({ theme, color }) =>
            getThemeProps(`palette.${color}.dark`, THEME.palette.primary.dark, { theme })};
        text-decoration: underline;
    }
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('ButtonLink.styles')};
`;

ButtonLink.propTypes = {
    /**
     * The content of the button.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * Apply themed styling to Button.
     *
     * Colors can be defined in `theme.palette`.
     */
    color: PropTypes.string,
    /**
     * Default onClick handler for the button
     */
    onClick: PropTypes.func,
};

ButtonLink.defaultProps = {
    children: null,
    className: '',
    color: 'primary',
    onClick: () => {},
};

export default ButtonLink;
