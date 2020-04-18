import PropTypes from 'prop-types';
import React from 'react';

import SvgIcon from '../SvgIcon';

/**
 * Render a arrow based on a given direction
 *
 * @method renderDirectionalArrowIcon
 * @param  {string}                   direction The direction of the arrow
 * @return {JSX}
 */
const renderDirectionalArrowIcon = direction => {
    switch (direction) {
        case 'up':
            return (
                <path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
            );
        case 'right':
            return (
                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
            );
        case 'down':
            return (
                <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" />
            );
        case 'left':
            return (
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            );
        default:
            return null;
    }
};

const ArrowIcon = ({ direction, setRef, ...rest }) => (
    <SvgIcon {...rest} ref={setRef}>
        {renderDirectionalArrowIcon(direction)}
    </SvgIcon>
);

ArrowIcon.propTypes = {
    direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),
    setRef: PropTypes.object,
    viewBox: PropTypes.string,
};

ArrowIcon.defaultProps = {
    direction: 'up',
    setRef: null,
    viewBox: '0 0 24 24',
};

export default ArrowIcon;
