import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';

import ButtonIcon from './ButtonIcon';

const ButtonSwitchInput = styled.input`
    cursor: inherit;
    height: 100%;
    left: 0;
    margin: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

class ButtonSwitch extends React.Component {
    static propTypes = {
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
         * Set the element to be read-only.
         */
        readOnly: PropTypes.bool,
        /**
         * If `true`, the input will be required.
         */
        required: PropTypes.bool,
        /**
         * The `type` of internal input.
         */
        type: PropTypes.string,
        /**
         * The value of the internal input component.
         */
        value: PropTypes.string,
    };

    static defaultProps = {
        checked: null,
        checkedIcon: null,
        className: '',
        disabled: false,
        icon: null,
        id: null,
        inputProps: null,
        inputRef: null,
        name: '',
        onBlur: null,
        onChange: null,
        onFocus: null,
        readOnly: false,
        required: false,
        type: 'checkbox',
        value: '',
    };

    constructor(props) {
        super(props);

        const { checked } = this.props;

        this.state = {
            checked: checked || false,
        };
    }

    handleFocus = event => {
        const { onFocus } = this.props;

        if (typeof onFocus === 'function') {
            onFocus(event);
        }
    };

    handleBlur = event => {
        const { onBlur } = this.props;

        if (typeof onBlur === 'function') {
            onBlur(event);
        }
    };

    handleChange = event => {
        const { onChange, checked: checkedProps } = this.props;
        let checked = _get(event, 'target.checked');

        if (checkedProps != null) {
            checked = checkedProps;
        }

        this.setState(() => ({ checked }));

        if (typeof onChange === 'function') {
            onChange(event, checked);
        }
    };

    render() {
        const {
            checkedIcon,
            disabled,
            icon,
            id,
            inputProps,
            inputRef,
            name,
            onBlur,
            onChange,
            onFocus,
            readOnly,
            required,
            type,
            value,
            ...other
        } = this.props;
        const { checked } = this.state;

        const hasLabelFor = type === 'checkbox' || type === 'radio';

        return (
            <ButtonIcon
                disabled={disabled}
                noMinWidth
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                role={undefined}
                tabIndex={null}
                {...other}
            >
                {checked ? checkedIcon : icon}
                <ButtonSwitchInput
                    checked={checked}
                    disabled={disabled}
                    id={hasLabelFor && id}
                    name={name}
                    onChange={this.handleChange}
                    readOnly={readOnly}
                    ref={inputRef}
                    required={required}
                    type={type}
                    value={value}
                    {...inputProps}
                />
            </ButtonIcon>
        );
    }
}

export default ButtonSwitch;
