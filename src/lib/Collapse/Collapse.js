import PropTypes from 'prop-types';
import React from 'react';
import Transition from 'react-transition-group/Transition';

import { DURATION } from 'constants/transitions';
import { getTransitionProps } from 'utils/transitions';
import { callFunc } from 'utils/actions';

import CollapseStyled from './CollapseStyled';
import CollapseWrapper from './CollapseWrapper';
import CollapseWrapperInner from './CollapseWrapperInner';

/**
 * Collapse from the top of the given child element.
 *
 * @method      Collapse
 * @param       {Object} props Component props
 * @constructor
 */
function Collapse(props) {
    const {
        children,
        collapsedHeight,
        in: inProps,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExiting,
        onMount,
        role,
        timeout,
        ...rest
    } = props;
    // Create a ref for the wrapper to extract it's height.
    const wrapperRef = React.useRef();
    // Call the `onMount` function when the component is successfully mounted.
    React.useEffect(() => {
        // Call the `onMount` func.
        callFunc(onMount, wrapperRef);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // EXPANDING
    // Handle the enter state.
    function handleOnEnter(element, isAppearing) {
        // Update the height of the element to match that of the collapsed height.
        element.style.height = collapsedHeight;
        // Call the callback if present.
        callFunc(onEnter, element, isAppearing);
    }
    // Handle the entering state.
    function handleOnEntering(element, isAppearing) {
        // Determine the current height of the inner wrapper (the main content).
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
        // Extract the requested duration, timeout, for the transition.
        const { duration: transitionDuration } = getTransitionProps(props, { mode: 'enter' });
        // Update the transition duration based on the supplied `timeout` property.
        element.style.transitionDuration =
            typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
        // Update the height of the element with that of the inner wrapper (the main content).
        element.style.height = `${wrapperHeight}px`;
        // Call the callback if present.
        callFunc(onEntering, element, isAppearing);
    }
    // Handle the entered state.
    function handleOnEntered(element, isAppearing) {
        // Update the height of the element to 'auto' since the collapse-in transition has completed.
        element.style.height = 'auto';
        // Call the callback if present.
        callFunc(onEntered, element, isAppearing);
    }
    // COLLAPSING
    // Handle the exit state.
    function handleOnExit(element) {
        // Determine the current height of the inner wrapper (the main content).
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
        // Update the height of the element with that of the inner wrapper (the main content).
        element.style.height = `${wrapperHeight}px`;
        // Reading a dimension property from an HTML element triggers a reflow.
        element.offsetHeight; // eslint-disable-line no-unused-expressions
        // Call the callback if present.
        callFunc(onExit, element);
    }
    // Handle the exiting state.
    function handleOnExiting(element) {
        // Extracting this variable triggers a reflow.
        const _height = element.offsetHeight; // eslint-disable-line no-unused-vars
        // Extract the requested duration, timeout, for the transition.
        const { duration: transitionDuration } = getTransitionProps(props, { mode: 'enter' });
        // Update the transition duration based on the supplied `timeout` property.
        element.style.transitionDuration =
            typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
        // Update the height of the element to match that of the collapsed height.
        element.style.height = collapsedHeight;
        // Call the callback if present.
        callFunc(onExiting, element);
    }
    // Render the Collapse.
    return (
        <Transition
            aria-expanded={role ? inProps : null}
            in={inProps}
            onEnter={handleOnEnter}
            onEntered={handleOnEntered}
            onEntering={handleOnEntering}
            onExit={handleOnExit}
            onExiting={handleOnExiting}
            timeout={timeout}
            {...rest}
        >
            {(state, childrenProps) => {
                return (
                    <CollapseStyled
                        entered={state === 'entered'}
                        isHidden={state === 'exited' && !inProps && collapsedHeight === '0px'}
                        minHeight={collapsedHeight}
                        {...childrenProps}
                    >
                        <CollapseWrapper ref={wrapperRef}>
                            <CollapseWrapperInner>{children}</CollapseWrapperInner>
                        </CollapseWrapper>
                    </CollapseStyled>
                );
            }}
        </Transition>
    );
}

Collapse.propTypes = {
    /**
     * A single element for the Transition to render.
     */
    children: PropTypes.node,
    /**
     * The height of the container when it is collapsed.
     */
    collapsedHeight: PropTypes.string,
    /**
     * If `true`, the transition will kick in.
     */
    in: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntered: PropTypes.func,
    onEntering: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onMount: PropTypes.func,
    role: PropTypes.bool,
    /**
     * The duration for the transition, in milliseconds.
     */
    timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    ]),
};

Collapse.defaultProps = {
    children: null,
    collapsedHeight: '0px',
    in: false,
    onEnter: null,
    onEntered: null,
    onEntering: null,
    onExit: null,
    onExiting: null,
    onMount: null,
    role: null,
    timeout: DURATION.long,
};

export default Collapse;
