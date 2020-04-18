import PropTypes from 'prop-types';
import React from 'react';

import SwitchBase from 'lib/SwitchBase';

import SwitchBar from './SwitchBar';
import SwitchIcon from './SwitchIcon';
import SwitchStyled from './SwitchStyled';

/**
 * A simple Switch.
 *
 * @method      Switch
 * @param       {Object} props The props
 * @constructor
 */
function Switch(props) {
    const { checkedIcon, isDisabled, icon, margin, onClick, useSameIcon, ...rest } = props;
    const switchBaseStyle = {
        height: '20px',
        width: '30px',
        zIndex: 2,
    };

    return (
        <SwitchStyled isDisabled={isDisabled} margin={margin} onClick={onClick}>
            <SwitchBase
                checkedIcon={checkedIcon}
                isDisabled={isDisabled}
                icon={icon}
                style={switchBaseStyle}
                useSameIcon={useSameIcon}
                {...rest}
            />
            <SwitchBar disabled={isDisabled} {...rest} />
        </SwitchStyled>
    );
}

Switch.propTypes = {
    activeBarColor: PropTypes.string,
    activeIconColor: PropTypes.string,
    checked: PropTypes.bool,
    checkedIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    inactiveBarColor: PropTypes.string,
    inactiveIconColor: PropTypes.string,
    isDisabled: PropTypes.bool,
    margin: PropTypes.string,
    onClick: PropTypes.func,
    useSameIcon: PropTypes.bool,
};

Switch.defaultProps = {
    activeBarColor: 'success',
    activeIconColor: 'white',
    checked: null,
    checkedIcon: null,
    icon: SwitchIcon,
    inactiveBarColor: 'muted',
    inactiveIconColor: 'light',
    isDisabled: null,
    margin: null,
    onClick: null,
    useSameIcon: true,
};

export default Switch;
