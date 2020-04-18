import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const SwitchBaseStyled = styled.div`
    display: inline-block;
    position: relative;
`;

const SwitchBaseInput = styled.input`
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

class SwitchBase extends React.Component {
    static propTypes = {
        /**
         * Properties passed down to the `icon` component.
         */
        IconProps: PropTypes.object,
        /**
         * If `true`, the internal input will be automatically focused on mount.
         */
        autoFocus: PropTypes.bool,
        /**
         * If `true`, the component is marked as checked.
         */
        checked: PropTypes.bool,
        /**
         * The icon to display when the component is checked.
         */
        checkedIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        /**
         * Define the default checked value if not a controlled input.
         */
        defaultChecked: PropTypes.bool,
        /**
         * If `true`, the Button will be disabled.
         */
        isDisabled: PropTypes.bool,
        /**
         * The Icon to display when the component is unchecked.
         */
        icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
         * The tab-index of the internal input.
         */
        tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The `type` of internal input.
         */
        type: PropTypes.string,
        /**
         * If `true`, you can use the same `icon` for both the checked and un-checked states.
         * No need to pass in an extra `checkedIcon` prop to `SwitchBase`.
         */
        useSameIcon: PropTypes.bool,
        /**
         * The value of the internal input component.
         */
        value: PropTypes.any,
    };

    static defaultProps = {
        IconProps: null,
        autoFocus: null,
        checked: null,
        checkedIcon() {},
        defaultChecked: false,
        isDisabled: null,
        icon() {},
        id: null,
        inputProps: null,
        inputRef: null,
        name: '',
        onBlur() {},
        onChange() {},
        onFocus() {},
        readOnly: null,
        required: null,
        tabIndex: null,
        type: 'checkbox',
        useSameIcon: null,
        value: null,
    };

    constructor(props) {
        super(props);

        const { checked, defaultChecked } = this.props;

        this.isControlled = checked != null;

        this.state = {};

        if (!this.isControlled) {
            this.state.checked = defaultChecked !== undefined ? defaultChecked : false;
        }
    }

    handleFocus = event => {
        const { onFocus } = this.props;
        const { checked } = this.state;

        if (typeof onFocus === 'function') {
            onFocus(event, checked);
        }
    };

    handleBlur = event => {
        const { onBlur } = this.props;
        const { checked } = this.state;

        if (typeof onBlur === 'function') {
            onBlur(event, checked);
        }
    };

    handleInputChange = event => {
        const { onChange } = this.props;
        const { checked } = event.target;

        if (!this.isControlled) {
            this.setState({ checked });
        }

        if (typeof onChange === 'function') {
            onChange(event, checked);
        }
    };

    render() {
        const {
            IconProps,
            autoFocus,
            checked: checkedProps,
            checkedIcon,
            isDisabled,
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
            tabIndex,
            type,
            useSameIcon,
            value,
            ...other
        } = this.props;
        const { checked: checkedState } = this.state;

        const checked = this.isControlled ? checkedProps : checkedState;
        const hasLabelFor = type === 'checkbox' || type === 'radio';

        const Icon = useSameIcon ? icon : checked ? checkedIcon : icon;
        const iconProps = {
            checked,
            isDisabled,
            readOnly,
            required,
            ...IconProps,
        };

        return (
            <SwitchBaseStyled
                isDisabled={isDisabled}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                {...other}
            >
                <Icon {...iconProps} />
                <SwitchBaseInput
                    autoFocus={autoFocus}
                    checked={checked}
                    isDisabled={isDisabled}
                    id={hasLabelFor && id}
                    name={name}
                    onChange={this.handleInputChange}
                    readOnly={readOnly}
                    ref={inputRef}
                    required={required}
                    tabIndex={tabIndex}
                    type={type}
                    value={value}
                    {...inputProps}
                />
            </SwitchBaseStyled>
        );
    }
}

export default SwitchBase;
