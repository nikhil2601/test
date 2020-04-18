import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons/faCheckSquare';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons/faMinusSquare';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';

import FaIcon from 'lib/FaIcon';
import SwitchBase from 'lib/SwitchBase';
import { themeGet } from 'utils/theme';

/**
 * Generate the checkbox icon based on the given type.
 *
 * @method getCheckboxIcon
 * @param  {string}        type One of `active`, `inactive`, or `indeterminate`
 * @return {Function}           A React functional component
 */
function getCheckboxIcon(type) {
    let icon;
    // Update the icon based on the given `type`.
    switch (type) {
        case 'active': {
            icon = faCheckSquare;
            break;
        }
        case 'indeterminate': {
            icon = faMinusSquare;
            break;
        }
        default: {
            icon = faSquare;
            break;
        }
    }
    // Return a React functional component.
    return function CheckboxIcon(config) {
        const { checked, color: colorProps, inactiveColor, isDisabled, ...rest } = config;
        // Determine the color of the Icon based on the `checked` value.
        const color = checked ? colorProps : inactiveColor;
        // Render the Icon
        return <FaIcon icon={icon} color={color} disabled={isDisabled} {...rest} />;
    };
}

const CheckboxStyled = styled(SwitchBase)`
    cursor: pointer;
    position: relative;
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('Checkbox.styles')};
`;

function Checkbox(props) {
    const { checkedIcon, icon, indeterminate, indeterminateIcon, inputProps, ...other } = props;

    return (
        <CheckboxStyled
            IconProps={{ height: '19px', width: '19px', ...other }}
            checkedIcon={indeterminate ? indeterminateIcon : checkedIcon}
            inputProps={{
                'data-indeterminate': indeterminate,
                ...inputProps,
            }}
            icon={indeterminate ? indeterminateIcon : icon}
            {...other}
        />
    );
}

Checkbox.propTypes = {
    /**
     * If `true`, the component is marked as checked.
     */
    checked: PropTypes.bool,
    /**
     * The icon to display when the component is checked.
     */
    checkedIcon: PropTypes.func,
    /**
     * Apply themed styling to Checkbox in `active` state.
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
     * Apply themed styling to Checkbox in `inactive` state.
     *
     * Colors can be defined in `theme.palette`.
     */
    inactiveColor: PropTypes.string,
    /**
     * If set `true`, the icon appears indeterminate.
     */
    indeterminate: PropTypes.bool,
    /**
     * The Icon to display when the component is indeterminate.
     */
    indeterminateIcon: PropTypes.func,
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
    value: PropTypes.string,
};

Checkbox.defaultProps = {
    checked: false,
    checkedIcon: getCheckboxIcon('active'),
    color: 'primary',
    disabled: false,
    icon: getCheckboxIcon(),
    id: null,
    inactiveColor: null,
    indeterminate: null,
    indeterminateIcon: getCheckboxIcon('indeterminate'),
    inputProps: null,
    inputRef: null,
    onChange: null,
    type: 'checkbox',
    value: '',
};

export default Checkbox;
