import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../SvgIcon';

const AlertIcon = ({ setRef, ...rest }) => (
    <SvgIcon {...rest} ref={setRef}>
        <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </SvgIcon>
);

AlertIcon.propTypes = {
    setRef: PropTypes.object,
    viewBox: PropTypes.string,
};

AlertIcon.defaultProps = {
    setRef: null,
    viewBox: '0 0 24 24',
};

export default AlertIcon;
