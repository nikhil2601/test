import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import SwitchBase from 'lib/SwitchBase';
import { CheckboxIcon, CheckboxEmptyIcon } from 'lib/SvgIcon';
import { THEME } from 'constants/theme';
import { getThemeProps } from 'utils/theme';

const CheckboxIconActive = styled(CheckboxIcon)`
    color: ${({ theme, color }) =>
        getThemeProps(`palette.${color}.color`, THEME.palette.primary.color, { theme })};
    height: 17px;
    width: 17px;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('Checkbox.active.styles')};
`;

const CheckboxIconInActive = styled(CheckboxEmptyIcon)`
    height: 17px;
    width: 17px;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('Checkbox.inactive.styles')};
`;

const Checkbox = styled(SwitchBase)`
    cursor: pointer;
    margin-top: 4px;
    position: relative;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('Checkbox.styles')};
`;

Checkbox.propTypes = {
    /**
     * If `true`, the component is marked as checked.
     */
    checked: PropTypes.bool,
    /**
     * The icon to display when the component is checked.
     */
    checkedIcon: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * Apply themed styling to Checkbox.
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
    icon: PropTypes.node,
    /**
     * The id for the `input` element.
     */
    id: PropTypes.string,
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
     * @ignore
     */
    name: PropTypes.string,
    /**
     * @ignore
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired when the internal state is changed.
     */
    onChange: PropTypes.func,
    /**
     * @ignore
     */
    onFocus: PropTypes.func,
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
    checked: null,
    checkedIcon: <CheckboxIconActive />,
    className: '',
    color: 'primary',
    disabled: false,
    icon: <CheckboxIconInActive />,
    id: null,
    inputProps: null,
    inputRef: null,
    name: '',
    onBlur: null,
    onChange: null,
    onFocus: null,
    type: 'checkbox',
    value: '',
};

export default Checkbox;
