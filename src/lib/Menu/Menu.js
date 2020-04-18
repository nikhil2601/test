import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';

import MenuContent from 'lib/MenuContent';
import Popover from 'lib/Popover';
import { ChevronIcon } from 'lib/SvgIcon';
import { MenuButton } from 'lib/Button';

class Menu extends React.Component {
    // Create a reference to the menuContent
    menuContentRef = React.createRef();

    static propTypes = {
        /**
         * The Menu action button component.
         */
        ButtonComponent: PropTypes.element,
        /**
         * The props passed down to the `ButtonComponent`.
         */
        ButtonProps: PropTypes.object,
        /**
         * The Content Component which holds all of the Menu's content / children.
         */
        ContentComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
        /**
         * The props passed down to the `ContentComponent`.
         */
        ContentProps: PropTypes.object,
        /**
         * The Component to render the Icon inside the Menu Anchor.
         */
        IconComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
        /**
         * The props passed down to the `IconComponent`.
         */
        IconProps: PropTypes.object,
        /**
         * @ignore
         */
        children: PropTypes.node,
        /**
         * The distance from the Menu to its container.
         */
        distanceFromContainer: PropTypes.number,
        /**
         * The position of the icon.
         */
        iconPosition: PropTypes.oneOf(['left', 'right']),
        /**
         * Callback fired when the Menu is closed.
         */
        onClose: PropTypes.func,
        /**
         * Callback fired when the Menu is opened.
         */
        onOpen: PropTypes.func,
        /**
         * Make Menu a controlled component.
         */
        open: PropTypes.bool,
        /**
         * The placement of the Menu.
         * This goes directly with placements defined in `Popper.js`.
         */
        placement: PropTypes.oneOf([
            'top-start',
            'top',
            'top-end',
            'right-start',
            'right',
            'right-end',
            'bottom-start',
            'bottom',
            'bottom-end',
            'left-start',
            'left',
            'left-end',
        ]),
    };

    static defaultProps = {
        ButtonComponent: <MenuButton />,
        ButtonProps: {},
        ContentComponent: MenuContent,
        ContentProps: {},
        IconComponent: ChevronIcon,
        IconProps: {
            direction: 'down',
            style: {
                color: '#FFF',
                height: 20,
                width: 20,
            },
        },
        children: null,
        distanceFromContainer: 5,
        iconPosition: 'right',
        onClose: null,
        onOpen: null,
        open: null,
        placement: 'bottom-start',
    };

    state = {
        open: false,
    };

    /**
     * Handle the menu open event
     *
     * @method handleMenuOpen
     * @param {Object}        event The synthetic event
     */
    handleMenuOpen = event => {
        event.preventDefault();
        // Extract the `onOpen` prop.
        const { onOpen } = this.props;
        // Update the state to open the menu.
        this.setState(
            () => ({ open: true }),
            () => {
                // Add an event listener to the document for closing the menu.
                document.addEventListener('click', this.handleMenuClose);
                // If there is a valid `onOpen` function, invoke it.
                typeof onOpen === 'function' && onOpen(event);
            }
        );
    };

    /**
     * Handle the menu close event
     *
     * @method handleMenuClose
     * @param {Object}         event The synthetic event
     */
    handleMenuClose = event => {
        const { current } = this.menuContentRef;
        // Close the menu only if we click outside the menu's content.
        if (current && event.target && !current.contains(event.target)) {
            this.closeMenu(event);
        }
    };

    /**
     * Handle the menu close event
     *
     * @method closeMenu
     * @param {Object}   event The synthetic event
     */
    closeMenu = event => {
        // Extract the `onClose` prop.
        const { onClose } = this.props;
        // Update the state to close the menu.
        this.setState(
            () => ({ open: false }),
            () => {
                // Remove the previously added event listener to the document.
                document.removeEventListener('click', this.handleMenuClose);
                // If there is a valid `onClose` function, invoke it.
                typeof onClose === 'function' && onClose(event);
            }
        );
    };

    /**
     * Render the children for the Menu Anchor Component
     *
     * @method renderMenuAnchorChildren
     * @return {JSX}
     */
    renderMenuAnchorChildren = () => {
        const { ButtonComponent, ButtonProps, IconComponent, IconProps, iconPosition } = this.props;

        return (
            <React.Fragment>
                {IconComponent && iconPosition === 'left' && (
                    <IconComponent {...IconProps} position={iconPosition} />
                )}
                {_get(ButtonComponent, 'props.children') || _get(ButtonProps, 'children')}
                {IconComponent && iconPosition === 'right' && (
                    <IconComponent {...IconProps} position={iconPosition} />
                )}
            </React.Fragment>
        );
    };

    /**
     * Render the anchor for the Menu
     *
     * @method renderMenuAnchor
     * @return {JSX}
     */
    renderMenuAnchor = () => {
        const { ButtonComponent, ButtonProps } = this.props;
        // Clean the passed in props for the button component.
        const { children, ...cleanedButtonProps } = ButtonProps;
        // Build the props for the button component.
        const btnProps = {
            onClick: this.handleMenuOpen,
            ...cleanedButtonProps,
        };
        // If we have a regular HTML DOM element, or a React functional component, render it.
        if (typeof ButtonComponent === 'string' || typeof ButtonComponent === 'function') {
            return React.createElement(ButtonComponent, btnProps, this.renderMenuAnchorChildren());
        }
        // Otherwise, clone the passed in element.
        return React.cloneElement(ButtonComponent, btnProps, this.renderMenuAnchorChildren());
    };

    render() {
        const { open: openState } = this.state;

        const {
            ButtonComponent,
            ButtonProps,
            ContentComponent,
            ContentProps,
            IconComponent,
            IconProps,
            children,
            iconPosition,
            open: openProps,
            ...dropdownProps
        } = this.props;

        const { popperStyles } = ButtonProps;

        const open = typeof openProps === 'boolean' ? openProps : openState;

        return (
            <Popover
                anchor={this.renderMenuAnchor()}
                open={open}
                {...dropdownProps}
                PopperProps={{ style: popperStyles }}
            >
                {renderProps => (
                    <ContentComponent ref={this.menuContentRef} {...renderProps} {...ContentProps}>
                        {children}
                    </ContentComponent>
                )}
            </Popover>
        );
    }
}

export default Menu;
