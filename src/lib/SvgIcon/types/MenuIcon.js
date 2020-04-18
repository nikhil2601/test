import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../SvgIcon';

const MenuIcon = ({ setRef, ...rest }) => (
    <SvgIcon {...rest} ref={setRef}>
        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </SvgIcon>
);

MenuIcon.propTypes = {
    setRef: PropTypes.func,
    viewBox: PropTypes.string,
};

MenuIcon.defaultProps = {
    setRef: null,
    viewBox: '0 0 24 24',
};

export default MenuIcon;
