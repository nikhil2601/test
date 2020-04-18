import PropTypes from 'prop-types';
import React from 'react';
import rgba from 'polished/lib/color/rgba';
import styled from 'styled-components';

import Fade from 'lib/Fade';
import { getThemeProps } from 'utils/theme';

const BackdropStyled = styled.div`
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: ${({ position }) => position || 'fixed'};
    right: 0;
    top: 0;
    user-select: none;
    z-index: 1000;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('Backdrop.styles')};
    /**
     * Add dynamic styles.
     */
    ${({ theme, color, opacity }) => {
        const backgroundColor = rgba(
            getThemeProps(`palette.${color}.color`, '#2D2D2D', {
                theme,
            }),
            opacity
        );

        return {
            backgroundColor,
        };
    }};
`;

/**
 * Increment the transition duration for inner transition to take effect.
 *
 * @method incrementInnerDuration
 * @param  {number|Object}        duration The transition duration
 * @return {number|Object}
 */
const incrementInnerDuration = duration => {
    const INNER_DURATION = 350;

    if (typeof duration === 'number') {
        return duration + INNER_DURATION;
    }

    if (duration && typeof duration === 'object') {
        return {
            enter: duration.enter + INNER_DURATION,
            exit: duration.exit + INNER_DURATION,
        };
    }

    return INNER_DURATION;
};

const Backdrop = ({
    TransitionComponent,
    children,
    onBackdropClick,
    opacity,
    open,
    position,
    transitionDuration,
    color,
    ...other
}) => (
    <Fade appear in={open} timeout={transitionDuration} {...other}>
        <BackdropStyled
            aria-hidden="true"
            onClick={onBackdropClick}
            opacity={opacity}
            position={position}
            color={color}
        >
            <TransitionComponent appear in timeout={incrementInnerDuration(transitionDuration)}>
                {children}
            </TransitionComponent>
        </BackdropStyled>
    </Fade>
);

Backdrop.propTypes = {
    /**
     * A Transition Component.
     */
    TransitionComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    /**
     * The main content for the backdrop.
     */
    children: PropTypes.node,
    /**
     * Apply themed styling to Backdrop.
     *
     * Colors can be defined in `theme.palette`.
     */
    color: PropTypes.string,
    /**
     * Callback fired on backdrop click event.
     */
    onBackdropClick: PropTypes.func,
    /**
     * The opacity of the background color.
     */
    opacity: PropTypes.number,
    /**
     * If `true`, the Backdrop is open.
     */
    open: PropTypes.bool,
    /**
     * Sets the 'position' css property.
     */
    position: PropTypes.oneOf(['absolute', 'fixed', 'relative']),
    /**
     * The duration for the transition, in milliseconds.
     */
    transitionDuration: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    ]),
};

Backdrop.defaultProps = {
    TransitionComponent: Fade,
    children: null,
    color: 'dark',
    onBackdropClick: () => {},
    opacity: 0.5,
    open: false,
    position: 'fixed',
    transitionDuration: 0,
};

export default Backdrop;
