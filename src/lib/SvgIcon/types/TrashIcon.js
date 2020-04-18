import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../SvgIcon';

const TrashIcon = ({ setRef, ...rest }) => (
    <SvgIcon {...rest} ref={setRef}>
        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
    </SvgIcon>
);

TrashIcon.propTypes = {
    setRef: PropTypes.object,
    viewBox: PropTypes.string,
};

TrashIcon.defaultProps = {
    setRef: null,
    viewBox: '0 0 24 24',
};

export default TrashIcon;
