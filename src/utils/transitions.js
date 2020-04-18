import _get from 'lodash/get';

import { EASING, DURATION } from 'constants/transitions';

/**
 * Reset a transition to its starting position.
 *
 * @method resetTransition
 * @param  {Node}        node The transition to reset
 * @return {Func}
 */
export const resetTransition = node => node.scrollTop;

/**
 * Get the duration and delay props for a given transition.
 *
 * @method getTransitionProps
 * @param  {Object}           [props={}]   The current props
 * @param  {Object}           [options={}] The current options
 * @return {Object}
 */
export const getTransitionProps = (props = {}, options = {}) => {
    const { timeout, style = {} } = props;
    // Extract the transition duration and delay.
    const transitionDuration = _get(style, 'transitionDuration', 0);
    const transitionDelay = _get(style, 'transitionDelay', 0);
    // Extract the timeout mode if present.
    const modeTimeout = _get(timeout, options.mode);
    // Build the duration for the transition.
    const duration = transitionDuration || typeof timeout === 'number' ? timeout : modeTimeout;
    // Build the delay for the transition.
    const delay = transitionDelay;

    return {
        duration,
        delay,
    };
};

/**
 * Create a new transition for a given element and props.
 *
 * @method createNewTransition
 * @param  {Array}             [animProps=['all']] The different animations to create
 * @param  {Object}            [animOptions={}]    The animation options
 * @return {string}                                The final animation
 */
export const createNewTransition = (animProps = ['all'], animOptions = {}) => {
    const {
        duration: durationOption = DURATION.regular,
        easing: easingOption = EASING.easeInOut,
        delay: delayOption = 0,
    } = animOptions;

    // Convert the props to an Array if not already one.
    const props = Array.isArray(animProps) ? [...animProps] : [animProps];
    // Format the animation duration by rounding it up and adding `ms` string to it.
    const animDuration =
        typeof durationOption === 'string' ? durationOption : `${Math.round(durationOption)}ms`;
    // Format the animation delay by rounding it up and adding `ms` string to it.
    const animDelay =
        typeof delayOption === 'string' ? delayOption : `${Math.round(delayOption)}ms`;
    // Build the animation based on the given props.
    const animation = props
        .map(animType => `${animType} ${animDuration} ${easingOption} ${animDelay}`)
        .join(',');

    return animation;
};

/**
 * Determine the 'auto-height' duration for a given HTML element.
 *
 * @method getAutoHeightDuration
 * @param  {number}              height The height of the HTML element to determine the duration for
 * @return {number}
 */
export const getAutoHeightDuration = height => {
    // Return 0 if no height is defined
    if (!height) {
        return 0;
    }
    // Divide the height by 36
    const heightConstant = height / 36;
    // @see {@link https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10}
    return Math.round((4 + 15 * heightConstant ** 0.25 + heightConstant / 5) * 10);
};

/**
 * Create transitions for the current theme.
 *
 * @method createTransitions
 * @return {Object}          The map container all of the transitions functions and values
 */
export const createTransitions = () => ({
    easing: EASING,
    duration: DURATION,
    create: createNewTransition,
    getAutoHeightDuration,
});
