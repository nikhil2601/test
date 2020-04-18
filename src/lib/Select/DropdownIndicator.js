import React from 'react';
import { components } from 'react-select';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';

import FaIcon from 'lib/FaIcon';

// Custom DropdownIndicator for the Select.
function DropdownIndicator(props) {
    return (
        <components.DropdownIndicator {...props}>
            <FaIcon icon={faAngleDown} width="17px" height="17px" />
        </components.DropdownIndicator>
    );
}

export default DropdownIndicator;
