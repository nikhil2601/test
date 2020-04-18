import PropTypes from 'prop-types';
import React from 'react';

import Input from 'lib/Input';

function BaseInput(props) {
    const {
        autofocus,
        disabled,
        formContext,
        id,
        onBlur,
        onFocus,
        options,
        readonly,
        registry,
        schema,
        value,
        ...inputProps
    } = props;

    if (!id) {
        console.log('No id for BaseInput :', props); // eslint-disable-line no-console
        throw new Error(`no id for BaseInput ${JSON.stringify(props)}`);
    }

    inputProps.type = options.inputType || inputProps.type || 'text';
    const _onChange = ({ target: { value } }) =>
        props.onChange(value === '' ? options.emptyValue : value);
    const { rawErrors, ...cleanProps } = inputProps;

    return (
        <Input
            autoFocus={autofocus}
            disabled={disabled}
            id={id}
            readOnly={readonly}
            value={value == null ? '' : value}
            {...cleanProps}
            onChange={_onChange}
            onBlur={
                typeof onBlur === 'function' && (event => onBlur(inputProps.id, event.target.value))
            }
            onFocus={
                typeof onFocus === 'function' &&
                (event => onFocus(inputProps.id, event.target.value))
            }
        />
    );
}

BaseInput.propTypes = {
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    formContext: PropTypes.object,
    id: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.object,
    readonly: PropTypes.bool,
    registry: PropTypes.object,
    required: PropTypes.bool,
    schema: PropTypes.object,
    value: PropTypes.any,
};

BaseInput.defaultProps = {
    autofocus: false,
    disabled: false,
    formContext: null,
    onBlur: false,
    onChange: false,
    onFocus: false,
    options: null,
    readonly: false,
    registry: null,
    required: false,
    schema: null,
    value: null,
};

export default BaseInput;
