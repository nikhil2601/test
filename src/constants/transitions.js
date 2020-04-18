/**
 * Transition easing functions.
 *
 * @type {Object}
 */
export const EASING = {
    ease: 'cubic-bezier(0.250, 0.100, 0.250, 1.000)',
    easeIn: 'cubic-bezier(0.420, 0.000, 1.000, 1.000)',
    easeInOut: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
    easeOut: 'cubic-bezier(0.000, 0.000, 0.580, 1.000)',
    linear: 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
};

/**
 * Transition durations.
 *
 * @type {Object}
 */
export const DURATION = {
    none: 10,
    short: 150,
    medium: 200,
    regular: 300,
    long: 375,
    complex: 425,
    enter: 225,
    exit: 195,
};
