import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';

import CollapseStyled from './CollapseSpringStyled';
import CollapseWrapper from './CollapseSpringWrapper';

/**
 * Collapse from the top of the given child element.
 *
 * @method      Collapse
 * @param       {Object} props Component props
 * @constructor
 */
function Collapse(props) {
    const { children, collapsedHeight: collapsedHeightProps, in: inProps, ...rest } = props;
    // Create a ref for the wrapper to extract it's height.
    const wrapperRef = useRef();
    // Update the height of the animatedProps.
    useEffect(
        () => {
            // Extract the height of the wrapper.
            const height = wrapperRef.current.clientHeight;
            // Update the animated props with the new height, or the passed in `collapsedHeight`.
            setAnimatedProps({ height: inProps ? height : collapsedHeight });
        },
        // Make sure to only run when the `in` props change.
        [inProps]
    );
    // Fix the `collapsedHeight` in case sent in props was not a number.
    const collapsedHeight = typeof collapsedHeightProps === 'number' ? collapsedHeightProps : 0;
    // Create the animated spring transition.
    const [animatedProps, setAnimatedProps] = useSpring(() => ({
        from: { height: 0 },
        config: {
            tension: 200,
            ...rest.config,
        },
        ...rest,
    }));
    // Render the Collapse.
    return (
        <CollapseStyled style={animatedProps}>
            <CollapseWrapper ref={wrapperRef}>{children}</CollapseWrapper>
        </CollapseStyled>
    );
}

Collapse.propTypes = {
    /**
     * A single element for the Transition to render.
     */
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * The height of the container when it is collapsed.
     */
    collapsedHeight: PropTypes.number,
    /**
     * If `true`, the transition will kick in.
     */
    in: PropTypes.bool,
};

Collapse.defaultProps = {
    children: null,
    collapsedHeight: 0,
    in: false,
};

export default Collapse;
