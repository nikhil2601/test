import PropTypes from 'prop-types';
import React from 'react';
import Transition from 'react-transition-group/Transition';
import _get from 'lodash/get';

import { THEME } from 'constants/theme';
import { getTransitionProps, resetTransition } from 'utils/transitions';

const getScale = val => `scale(${val}, ${val ** 2})`;

/**
 * Transition styles for the Grow transition
 *
 * @type {Object}
 */
const transitionStyles = {
    entering: {
        opacity: 1,
        transform: getScale(1),
    },
    entered: {
        opacity: 1,
        transform: `${getScale(1)} translateZ(0)`,
    },
};

class Grow extends React.Component {
    static propTypes = {
        /**
         * A single element for the Transition to render.
         */
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        /**
         * If `true`, the transition will kick in.
         */
        in: PropTypes.bool,
        /**
         * Callback fired before the `entering` status is applied.
         *
         * @param {HTMLElement} node
         * @param {boolean}     isAppearing
         */
        onEnter: PropTypes.func,
        /**
         * Callback fired before the `exiting` status is applied.
         *
         * @param {HTMLElement} node
         */
        onExit: PropTypes.func,
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
        children: null,
        in: null,
        onEnter: null,
        onExit: null,
        style: null,
        timeout: 'auto',
    };

    autoTimeout = null;

    timer = null;

    componentWillUnmount = () => {
        clearTimeout(this.timer);
    };

    handleEnter = (node, isAppearing) => {
        const { onEnter, timeout } = this.props;
        let duration = 0;

        resetTransition(node);

        const { duration: transitionDuration, delay } = getTransitionProps(this.props, {
            mode: 'enter',
        });

        if (timeout === 'auto') {
            duration = THEME.transitions.getAutoHeightDuration(node.clientHeight);
            this.autoTimeout = duration;
        } else {
            duration = transitionDuration;
        }

        node.style.transition = [
            THEME.transitions.create('opacity', { duration, delay }),
            THEME.transitions.create('transform', {
                duration: duration * 0.666,
                delay,
            }),
        ];

        if (typeof onEnter === 'function') {
            onEnter(node, isAppearing);
        }
    };

    handleExit = node => {
        const { onExit, timeout } = this.props;
        let duration = 0;

        const { duration: transitionDuration, delay } = getTransitionProps(this.props, {
            mode: 'exit',
        });

        if (timeout === 'auto') {
            duration = THEME.transitions.getAutoHeightDuration(node.clientHeight);
            this.autoTimeout = duration;
        } else {
            duration = transitionDuration;
        }

        node.style.transition = [
            THEME.transitions.create('opacity', { duration, delay }),
            THEME.transitions.create('transform', {
                duration: duration * 0.666,
                delay: delay || duration * 0.333,
            }),
        ];

        node.style.opacity = '0';
        node.style.transform = getScale(0.75);

        if (typeof onExit === 'function') {
            onExit(node);
        }
    };

    addEndListener = (node, done) => {
        const { timeout } = this.props;

        if (timeout === 'auto') {
            this.timer = setTimeout(done, this.autoTimeout || 0);
        }
    };

    render() {
        const { children, onEnter, onExit, style: styleProp, timeout, ...other } = this.props;
        const childrenStyles = React.isValidElement(children)
            ? _get(children, 'props.style', {})
            : {};

        const style = {
            ...styleProp,
            ...childrenStyles,
        };

        return (
            <Transition
                addEndListener={this.addEndListener}
                appear
                onEnter={this.handleEnter}
                onExit={this.handleExit}
                timeout={timeout === 'auto' ? null : timeout}
                {...other}
            >
                {(state, childProps) =>
                    React.cloneElement(children, {
                        style: {
                            opacity: 0,
                            transform: getScale(0.75),
                            ...transitionStyles[state],
                            ...style,
                        },
                        ...childProps,
                    })
                }
            </Transition>
        );
    }
}

export default Grow;
