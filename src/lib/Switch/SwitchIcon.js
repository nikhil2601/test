import PropTypes from 'prop-types';
import React from 'react';
import { withTheme } from 'styled-components';

import Box from 'lib/Box';

const SwitchIcon = React.forwardRef((props, ref) => {
    const { activeIconColor, checked, children, inactiveIconColor, theme, ...rest } = props;

    const backgroundColor = checked ? activeIconColor : inactiveIconColor;
    const borderColor = checked ? activeIconColor : inactiveIconColor;
    const iconStyles = {
        left: checked ? '13px' : '3px',
        position: 'absolute',
        top: '3px',
        transition: theme.transitions.create(['left', 'border-color', 'background-color'], {
            duration: theme.transitions.duration.short,
        }),
    };

    return (
        <Box
            borderRadius="50%"
            {...rest}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            height="14px"
            margin="0"
            padding="0"
            ref={ref}
            style={iconStyles}
            width="14px"
        />
    );
});

SwitchIcon.propTypes = {
    children: PropTypes.node,
    activeIconColor: PropTypes.string,
    checked: PropTypes.bool,
    inactiveIconColor: PropTypes.string,
    theme: PropTypes.object,
};

SwitchIcon.defaultProps = {
    children: null,
    activeIconColor: 'white',
    checked: null,
    inactiveIconColor: 'light',
    theme: null,
};

SwitchIcon.displayName = 'SwitchIcon';

export default withTheme(SwitchIcon);
