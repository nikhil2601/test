import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

import Button from './Button';

const ButtonIcon = styled(Button)`
    background: transparent;
    border-radius: 50%;
    color: ${getThemeProps('palette.text.color')};
    font-size: 12px;
    height: auto;
    padding: 0;
    text-align: center;
    transition: background-color ${getThemeProps('palette.transitions.duration.short')}
        ${getThemeProps('palette.transitions.easing.easeInOut')};
    width: auto;
    &:hover,
    &:active,
    &:disabled {
        background-color: transparent;
    }
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('ButtonSecondary.styles')};
`;

ButtonIcon.propTypes = {
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
     * Do not apply a minimum width to the button.
     */
    noMinWidth: PropTypes.bool,
    /**
     * Default onClick handler for the button
     */
    onClick: PropTypes.func,
    /**
     * Give the button a set width.
     */
    width: PropTypes.string,
};

ButtonIcon.defaultProps = {
    children: null,
    className: '',
    color: 'primary',
    noMinWidth: false,
    onClick: () => {},
    width: null,
};

export default ButtonIcon;
