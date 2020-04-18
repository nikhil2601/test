import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons/faDotCircle';

import FaIcon from 'lib/FaIcon';
import SwitchBase from 'lib/SwitchBase';
import { themeGet } from 'utils/theme';

/**
 * Generate the radio icon based on the given type.
 *
 * @method getRadioIcon
 * @param  {string}       type One of `checked` or null
 * @return {Function}          A React functional component
 */
function getRadioIcon(type) {
    const icon = type === 'checked' ? faDotCircle : faCircle;
    // Return a React functional component.
    return function RadioIcon(config) {
        const { checked, color: colorProps, inactiveColor, isDisabled, ...rest } = config;
        // Determine the color of the Icon based on the `checked` value.
        const color = checked ? colorProps : inactiveColor;
        // Render the Icon.
        return <FaIcon icon={icon} color={color} disabled={isDisabled} {...rest} />;
    };
}

const RadioStyled = styled(SwitchBase)`
    cursor: pointer;
    position: relative;
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('Radio.styled')};
`;

function Radio(props) {
    const { checkedIcon, icon, ...other } = props;

    return (
        <RadioStyled checkedIcon={checkedIcon} icon={icon} height="16px" width="16px" {...other} />
    );
}

Radio.propTypes = {
    /**
     * If `true`, the component is marked as checked.
     */
    checked: PropTypes.bool,
    /**
     * The icon to display when the component is checked.
     */
    checkedIcon: PropTypes.func,
    /**
     * Apply themed styling to Radio in `active` state.
     *
     * Colors can be defined in `theme.palette`.
     */
    color: PropTypes.string,
    /**
     * If `true`, the Button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * The Icon to display when the component is unchecked.
     */
    icon: PropTypes.func,
    /**
     * The id for the `input` element.
     */
    id: PropTypes.string,
    /**
     * Apply themed styling to Radio in `inactive` state.
     *
     * Colors can be defined in `theme.palette`.
     */
    inactiveColor: PropTypes.string,
    /**
     * The attributes for the `input` element.
     */
    inputProps: PropTypes.object,
    /**
     * Attaches a React ref to the native input component.
     * Can use a `node => this.ref = node` function, or a `React.createRef()` object.
     */
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**
     * Callback fired when the internal state is changed.
     */
    onChange: PropTypes.func,
    /**
     * The `type` of internal input.
     */
    type: PropTypes.string,
    /**
     * The value of the internal input component.
     */
    value: PropTypes.any,
};

Radio.defaultProps = {
    checked: false,
    checkedIcon: getRadioIcon('checked'),
    color: 'secondary',
    disabled: false,
    icon: getRadioIcon(),
    id: null,
    inactiveColor: null,
    inputProps: null,
    inputRef: null,
    onChange: null,
    type: 'radio',
    value: null,
};

export default Radio;
