/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import ReactDOM from 'react-dom';

import Portal from 'lib/Portal';
import { getAnchorEl } from 'utils/component';

class Popper extends React.Component {
    popper = null;

    static propTypes = {
        /**
         * The DOM element that is used to position the Popper.
         */
        anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        /**
         * The children of Popper.
         */
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        /**
         * The `container` will be passed to the Portal component.
         */
        container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        /**
         * Disable the React portal behavior.
         * Only the children will be rendered.
         */
        disable: PropTypes.bool,
        /**
         * Always keep the children mounted in the DOM.
         */
        keepMounted: PropTypes.bool,
        /**
         * If `true`, Popper will be visible.
         */
        open: PropTypes.bool,
        /**
         * The placement of the Popper relative to its `anchorEl`.
         */
        placement: PropTypes.oneOf([
            'bottom',
            'bottom-end',
            'bottom-start',
            'left',
            'left-end',
            'left-start',
            'right',
            'right-end',
            'right-start',
            'top',
            'top-end',
            'top-start',
        ]),
        /**
         * The duration for the transition, in milliseconds.
         */
        timeout: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
        ]),
        /**
         * Should we allow transitions?
         */
        transition: PropTypes.bool,
    };

    static defaultProps = {
        anchorEl: null,
        children: null,
        container: null,
        disable: false,
        keepMounted: false,
        open: false,
        placement: 'bottom',
        timeout: null,
        transition: false,
    };

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.open) {
            return {
                exited: false,
            };
        }

        if (!nextProps.transition) {
            return {
                exited: true,
            };
        }

        return null;
    }

    isCmpMounted = null;

    constructor(props) {
        super(props);

        const { open } = this.props;

        this.state = {
            exited: !open,
        };
    }

    componentDidMount = () => {
        this.isCmpMounted = true;
    };

    componentDidUpdate(prevProps, prevState) {
        const { open, anchorEl, disable, placement } = this.props;

        if (prevProps.open && !open) {
            this.handleClose();
        }

        if (
            prevProps.anchorEl !== anchorEl ||
            prevProps.disable !== disable ||
            prevProps.placement !== placement
        ) {
            this.handleRendered();
        }
    }

    componentWillUnmount() {
        this.isCmpMounted = false;
        this.handleClose();
    }

    handleRendered = () => {
        const { anchorEl, open, placement, disable } = this.props;
        const popperNode = ReactDOM.findDOMNode(this);
        const popperOptions = {};

        if (this.popper) {
            this.popper.destroy();
            this.popper = null;
        }

        if (!anchorEl || !popperNode || !open) {
            return;
        }

        this.popper = new PopperJS(getAnchorEl(anchorEl), popperNode, {
            placement,
            ...popperOptions,
            modifiers: {
                ...(disable
                    ? {}
                    : {
                          preventOverflow: {
                              boundariesElement: 'window',
                          },
                      }),
                ...popperOptions.modifiers,
            },
            onCreate: this.handlePopperUpdate,
            onUpdate: this.handlePopperUpdate,
        });
    };

    handlePopperUpdate = popperData => {
        const { placement } = this.state;

        if (popperData.placement !== placement) {
            this.isCmpMounted && this.setState(() => ({ placement: popperData.placement }));
        }
    };

    handleExited = () => {
        this.isCmpMounted && this.setState(() => ({ exited: true }));
        this.handleClose();
    };

    handleClose = () => {
        const { timeout } = this.props;

        if (!this.popper) {
            return;
        }

        if (timeout) {
            const ms = typeof timeout === 'number' ? timeout : timeout.exit;
            setTimeout(() => {
                this.isCmpMounted && this.setState(() => ({ exited: true }));
                if (this.popper) {
                    this.popper.destroy();
                    this.popper = null;
                }
            }, ms);
        } else {
            this.isCmpMounted && this.setState(() => ({ exited: true }));
            this.popper.destroy();
            this.popper = null;
        }
    };

    render() {
        const {
            anchorEl,
            children,
            container,
            disable,
            keepMounted,
            open,
            placement: placementProps,
            transition,
            ...other
        } = this.props;
        const { exited, placement } = this.state;

        if (!keepMounted && !open && (!transition || exited)) {
            return null;
        }

        const childProps = {
            placement: placement || placementProps,
        };

        if (transition) {
            childProps.TransitionProps = {
                in: open,
                onExited: this.handleExited,
            };
        }

        return (
            <Portal onMount={this.handleRendered} disable={disable} container={container}>
                <div role="tooltip" style={{ position: 'absolute' }} {...other}>
                    {typeof children === 'function' ? children(childProps) : children}
                </div>
            </Portal>
        );
    }
}

export default Popper;
