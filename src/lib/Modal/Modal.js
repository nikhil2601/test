import PropTypes from 'prop-types';
import React from 'react';
import noScroll from 'no-scroll';
import styled from 'styled-components';

import Backdrop from 'lib/Backdrop';
import Portal from 'lib/Portal';
import { DURATION } from 'constants/transitions';
import { getThemeProps } from 'utils/theme';

import ModalManager from './ModalManager';

const ModalStyled = styled.div`
    background-clip: padding-box;
    background: #fff;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.25);
    max-width: 768px;
    padding: 10px;
    position: relative;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('Modal.styles')};
`;

class Modal extends React.Component {
    static propTypes = {
        /**
         * The Backdrop Component which will be rendered behind the Modal.
         */
        BackdropComponent: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
            PropTypes.object,
        ]),
        /**
         * Properties for the `Backdrop` component.
         */
        BackdropProps: PropTypes.object,
        /**
         * The Content Component which holds all of the Modal's content / children.
         */
        ContentComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
        /**
         * The props passed down to the `ContentComponent`.
         */
        ContentProps: PropTypes.object,
        /**
         * Children for the Modal.
         */
        children: PropTypes.node,
        /**
         * Should the Modal close on the Backdrop click?
         */
        closeOnBackdropClick: PropTypes.bool,
        /**
         * If `true`, the modal will close on `esc` keydown.
         */
        closeOnEsc: PropTypes.bool,
        /**
         * The container to append the Modal to.
         */
        container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        /**
         * A modal manager used to track and manage the state of open modals.
         */
        manager: PropTypes.object,
        /**
         * Callback fired upon the Backdrop click.
         */
        onBackdropClick: PropTypes.func,
        /**
         * Callback fired when the component requests to be closed.
         */
        onClose: PropTypes.func,
        /**
         * Callback fired when the Modal enters the DOM.
         */
        onEntered: PropTypes.func,
        /**
         * Callback fired upon the `esc` keydown event.
         */
        onEscKeyDown: PropTypes.func,
        /**
         * Callback fired when the Modal exits the DOM.
         */
        onExited: PropTypes.func,
        /**
         * If `true`, the modal is open.
         */
        open: PropTypes.bool,
        /**
         * @ignore
         */
        style: PropTypes.object,
        /**
         * The duration for the transition, in milliseconds.
         */
        timeout: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
        ]),
    };

    static defaultProps = {
        BackdropComponent: Backdrop,
        BackdropProps: {},
        ContentComponent: ModalStyled,
        ContentProps: {},
        children: null,
        closeOnBackdropClick: true,
        closeOnEsc: true,
        container: null,
        manager: new ModalManager(),
        onBackdropClick: null,
        onClose: null,
        onEntered: null,
        onEscKeyDown: null,
        onExited: null,
        open: false,
        style: null,
        timeout: DURATION.regular,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.show && nextProps.open) {
            return {
                show: true,
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            show: props.open,
        };

        this.shouldClose = null;
    }

    componentDidMount() {
        const { open } = this.props;

        if (open) {
            this.handleOpen();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { show } = this.state;
        const { open } = this.props;

        if (prevState.show && !show) {
            this.handleClose();
        } else if (!prevProps.open && open) {
            this.handleOpen();
        }
    }

    componentWillUnmount() {
        const { open } = this.props;

        if (open) {
            this.handleClose();
        }
    }

    handleOpen = () => {
        const { manager } = this.props;

        manager.add(this);

        this.blockScroll();

        document.addEventListener('keydown', this.handleKeyDown);
    };

    handleClose = () => {
        const { manager } = this.props;

        manager.remove(this);

        this.unblockScroll();

        document.removeEventListener('keydown', this.handleKeyDown);
    };

    handleBackdropClick = event => {
        const { onBackdropClick, onClose, closeOnBackdropClick } = this.props;

        if (this.shouldClose === null) {
            this.shouldClose = true;
        }

        if (!this.shouldClose) {
            this.shouldClose = null;
            return;
        }

        if (typeof onBackdropClick === 'function') {
            onBackdropClick(event);
        }

        if (closeOnBackdropClick) {
            typeof onClose === 'function' && onClose(event);
        }

        this.shouldClose = null;
    };

    handleKeyDown = event => {
        const { manager, onEscKeyDown, onClose, closeOnEsc } = this.props;

        if (event.keyCode !== 27 || !manager.isTopModal(this)) {
            return;
        }

        if (typeof onEscKeyDown === 'function') {
            onEscKeyDown(event);
        }

        if (closeOnEsc) {
            typeof onClose === 'function' && onClose(event);
        }
    };

    handleModalEvent = () => {
        this.shouldClose = false;
    };

    handleEntered = () => {
        const { onEntered } = this.props;

        if (typeof onEntered === 'function') {
            onEntered();
        }
    };

    handleExited = () => {
        const { onExited } = this.props;

        if (typeof onExited === 'function') {
            onExited();
        }

        this.setState(() => ({ show: false }));

        this.unblockScroll();
    };

    unblockScroll = () => {
        const { manager } = this.props;

        if (manager.getModals().length === 0) {
            noScroll.off();
        }
    };

    blockScroll = () => {
        noScroll.on();
    };

    render() {
        const {
            BackdropComponent,
            BackdropProps,
            ContentComponent,
            ContentProps,
            children,
            container,
            open,
            timeout,
            style,
        } = this.props;

        const { show } = this.state;

        if (!show) {
            return null;
        }

        return (
            <Portal container={container}>
                <BackdropComponent
                    appear
                    in={open}
                    onBackdropClick={this.handleBackdropClick}
                    onEntered={this.handleEntered}
                    onExited={this.handleExited}
                    timeout={timeout}
                    {...BackdropProps}
                >
                    <ContentComponent
                        onClick={this.handleModalEvent}
                        onMouseDown={this.handleModalEvent}
                        onMouseUp={this.handleModalEvent}
                        style={style}
                        {...ContentProps}
                    >
                        {children}
                    </ContentComponent>
                </BackdropComponent>
            </Portal>
        );
    }
}

export default Modal;
