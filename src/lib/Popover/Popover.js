import PropTypes from 'prop-types';
import React from 'react';

import Fade from 'lib/Fade';
import Popper from 'lib/Popper';
import RootRef from 'lib/RootRef';
import { genID } from 'utils/generate';
import { getThemeProps } from 'utils/theme';

class Popover extends React.Component {
    static propTypes = {
        /**
         * Properties passed down to the `Popper.js` component.
         */
        PopperProps: PropTypes.object,
        /**
         * A Transition Component.
         */
        TransitionComponent: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
            PropTypes.object,
        ]),
        /**
         * Properties passed down to the `TransitionComponent` component.
         */
        TransitionProps: PropTypes.object,
        /**
         * The main anchor of the Popover.
         */
        anchor: PropTypes.node,
        /**
         * The size of the Popover Arrow.
         */
        arrowSize: PropTypes.number,
        /**
         * The main reference component.
         */
        children: PropTypes.func,
        /**
         * Apply themed styling to Popover.
         *
         * Colors can be defined in `theme.palette`.
         */
        color: PropTypes.string,
        /**
         * The number of milliseconds to wait before showing the Popover.
         */
        enterDelay: PropTypes.number,
        /**
         * Helps resolve the accessibility issue on readers / etc.
         * Fallbacks to an auto-generated ID.
         */
        id: PropTypes.string,
        /**
         * The number of milliseconds to wait before hiding the Popover.
         */
        leaveDelay: PropTypes.number,
        /**
         * The distance from the Popover to its container.
         */
        distanceFromContainer: PropTypes.number,
        /**
         * The maxWidth for the rendered Popover container.
         */
        maxWidth: PropTypes.string,
        /**
         * Event fired when the Popover is ready to be closed.
         */
        onClose: PropTypes.func,
        /**
         * Event fired when the Popover is ready to be opened.
         */
        onOpen: PropTypes.func,
        /**
         * If `true`, the Popover gets displayed.
         */
        open: PropTypes.bool,
        /**
         * The placement of the Popover.
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
        /**
         * The duration for the transition, in milliseconds.
         */
        timeout: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
        ]),
        /**
         * The Popover's title.
         */
        title: PropTypes.node,
    };

    static defaultProps = {
        PopperProps: {},
        TransitionComponent: Fade,
        TransitionProps: {},
        anchor: null,
        arrowSize: 7.5,
        children: null,
        color: 'dark',
        distanceFromContainer: 5,
        enterDelay: 0,
        id: null,
        leaveDelay: 0,
        maxWidth: '400px',
        onClose: null,
        onOpen: null,
        open: null,
        placement: 'top',
        timeout: null,
        title: '',
    };

    // Reference to the Popover's anchor.
    anchorRef = null;

    componentDidMount() {
        const { open } = this.props;
        // If we have a controlled Popover, then we should render immediately.
        if (open) {
            this.forceUpdate();
        }
    }

    componentWillUnmount() {
        // Clear out all of the timeouts.
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    }

    /**
     * Assign a `ref` to the anchor node.
     *
     * @method assignAnchorRef
     * @param  {React}       node The react DOM node
     * @return {Ref}
     */
    assignAnchorRef = node => (this.anchorRef = node);

    render() {
        const {
            PopperProps,
            TransitionComponent,
            TransitionProps,
            anchor,
            arrowSize,
            children,
            color,
            id,
            distanceFromContainer,
            maxWidth,
            open: openProps,
            placement,
            timeout: timeoutProps,
            title,
        } = this.props;

        // Get the default timeout for the Popover.
        const timeout =
            typeof timeoutProps === 'number'
                ? timeoutProps
                : getThemeProps('transitions.duration.regular')();

        // Store the current open as the `openProps`.
        let open = openProps;

        // What will we do with a blank Popover?
        if (!anchor) {
            open = false;
        }

        // Build the props for the Anchor
        const anchorProps = {
            'aria-describedby': id || `Popover_${genID()}`,
            title: typeof title === 'string' ? title : null,
        };

        return (
            <React.Fragment>
                <RootRef rootRef={this.assignAnchorRef}>
                    {React.cloneElement(anchor, anchorProps)}
                </RootRef>
                <Popper
                    anchorEl={this.anchorRef}
                    id={anchorProps['aria-describedby']}
                    open={open}
                    placement={placement}
                    timeout={timeout}
                    transition
                    {...PopperProps}
                >
                    {({ placement: childPlacement, TransitionProps: childTransitionProps }) => (
                        <TransitionComponent
                            direction={childPlacement.split('-')[0]}
                            timeout={timeout}
                            {...childTransitionProps}
                            {...TransitionProps}
                        >
                            {children({
                                anchorRef: this.anchorRef,
                                arrowSize,
                                color,
                                distanceFromContainer,
                                maxWidth,
                                placement: childPlacement,
                            })}
                        </TransitionComponent>
                    )}
                </Popper>
            </React.Fragment>
        );
    }
}

export default Popover;
