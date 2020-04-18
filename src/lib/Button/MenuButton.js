import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

import Button from './Button';

const MenuButton = styled(Button)`
    align-items: center;
    border-radius: 5px;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15px;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('MenuButton.styles')};
`;

MenuButton.propTypes = {
    /**
     * The content of the button.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * Do not apply a minimum width to the button.
     */
    noMinWidth: PropTypes.bool,
    /**
     * Default onClick handler for the button
     */
    onClick: PropTypes.func,
    /**
     * Apply themed styling to Button.
     *
     * Variant(s) can be defined in `theme.palette`.
     */
    color: PropTypes.string,
    /**
     * Give the button a set width.
     */
    width: PropTypes.string,
};

MenuButton.defaultProps = {
    children: null,
    className: '',
    noMinWidth: false,
    onClick: () => {},
    color: 'primary',
    width: null,
};

export default MenuButton;
