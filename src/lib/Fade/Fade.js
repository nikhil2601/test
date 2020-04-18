import PropTypes from 'prop-types';
import React from 'react';
import Transition from 'react-transition-group/Transition';
import _get from 'lodash/get';

import { DURATION } from 'constants/transitions';
import { getTransitionProps, resetTransition } from 'utils/transitions';
import { THEME } from 'constants/theme';

/**
 * Transition styles for the Fade transition
 *
 * @type {Object}
 */
const transitionStyles = {
    entering: {
        opacity: 1,
    },
    entered: {
        opacity: 1,
    },
};

/**
 * Fade in from transparent to opaque.
 *
 * @method      Fade
 * @param       {Object} props Component props
 * @constructor
 */
function Fade(props) {
    const { children, in: inProps, onEnter, onExit, ...rest } = props;
    // Handle the enter state.
    function handleOnEnter(element, isAppearing) {
        // Reset the transition each time.
        resetTransition(element);
        // Extract the transition props from the current props.
        // These include timeout / duration.
        const transitionProps = getTransitionProps(props, { mode: 'enter' });
        // Update the transition of the component with the 'enter' transition props.
        element.style.transition = THEME.transitions.create('opacity', transitionProps);
        // Call the callback if present.
        typeof onEnter === 'function' && onEnter(element, isAppearing);
    }
    // Handle the exit state.
    function handleOnExit(element) {
        // Extract the transition props from the current props.
        // These include timeout / duration.
        const transitionProps = getTransitionProps(props, { mode: 'exit' });
        // Update the transition of the component with the 'exit' transition props.
        element.style.transition = THEME.transitions.create('opacity', transitionProps);
        // Call the callback if present.
        typeof onExit === 'function' && onExit(element);
    }
    // Determine the children styles.
    const childrenStyles = _get(children, 'props.style', {});
    // Render the Fade.
    return (
        <Transition appear in={inProps} onEnter={handleOnEnter} onExit={handleOnExit} {...rest}>
            {(state, childrenProps) => {
                return React.cloneElement(children, {
                    style: {
                        opacity: 0,
                        visibility: state === 'exited' && !inProps ? 'hidden' : undefined,
                        ...transitionStyles[state],
                        ...childrenStyles,
                    },
                    ...childrenProps,
                });
            }}
        </Transition>
    );
}

Fade.propTypes = {
    /**
     * A single element for the Transition to render.
     */
    children: PropTypes.node,
    /**
     * If `true`, the transition will kick in.
     */
    in: PropTypes.bool,
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    /**
     * The duration for the transition, in milliseconds.
     */
    timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    ]),
};

Fade.defaultProps = {
    children: null,
    in: false,
    onEnter: null,
    onExit: null,
    timeout: DURATION.long,
};

export default Fade;
