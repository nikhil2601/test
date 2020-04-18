import PropTypes from 'prop-types';
import React from 'react';

import SvgIcon from '../SvgIcon';

/**
 * Render a chevron based on a given direction
 *
 * @method renderDirectionalChevron
 * @param  {string}                 direction The direction of the chevron
 * @return {JSX}
 */
const renderDirectionalChevron = direction => {
    switch (direction) {
        case 'up':
            return <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />;
        case 'right':
            return <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />;
        case 'down':
            return <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />;
        case 'left':
            return <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />;
        default:
            return null;
    }
};

/**
 * Render a 'double' chevron based on a given direction
 *
 * @method renderDoubleDirectionalChevron
 * @param  {string}                       direction The direction of the chevron
 * @return {JSX}
 */
const renderDoubleDirectionalChevron = direction => {
    switch (direction) {
        case 'up':
            return (
                <path d="M7.41,18.41L6,17L12,11L18,17L16.59,18.41L12,13.83L7.41,18.41M7.41,12.41L6,11L12,5L18,11L16.59,12.41L12,7.83L7.41,12.41Z" />
            );
        case 'right':
            return (
                <path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
            );
        case 'down':
            return (
                <path d="M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z" />
            );
        case 'left':
            return (
                <path d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" />
            );
        default:
            return null;
    }
};

const ChevronIcon = ({ direction, setRef, type, ...rest }) => (
    <SvgIcon {...rest} ref={setRef}>
        {type === 'double'
            ? renderDoubleDirectionalChevron(direction)
            : renderDirectionalChevron(direction)}
    </SvgIcon>
);

ChevronIcon.propTypes = {
    direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),
    type: PropTypes.oneOf(['double', 'single']),
    setRef: PropTypes.object,
    viewBox: PropTypes.string,
};

ChevronIcon.defaultProps = {
    direction: 'up',
    type: 'single',
    setRef: null,
    viewBox: '0 0 24 24',
};

export default ChevronIcon;
