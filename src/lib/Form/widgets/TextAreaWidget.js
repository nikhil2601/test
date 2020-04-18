import PropTypes from 'prop-types';
import React from 'react';

import TextArea from 'lib/TextArea';

function TextAreaWidget(props) {
    const {
        autofocus,
        disabled,
        formContext,
        id,
        onBlur,
        onChange,
        onFocus,
        options,
        readonly,
        registry,
        schema,
        value,
        ...inputProps
    } = props;

    if (!id) {
        console.log('No id for TextAreaWidget :', props); // eslint-disable-line no-console
        throw new Error(`no id for TextAreaWidget ${JSON.stringify(props)}`);
    }

    const { inputType = '', emptyValue = '', label, enumOptions, ...optionProps } = options;

    inputProps.type = inputType || inputProps.type || 'textarea';

    const _onChange = ({ target: { value } }) => onChange(value === '' ? emptyValue : value);

    const { rawErrors, ...cleanProps } = inputProps;

    return (
        <TextArea
            autoFocus={autofocus}
            disabled={disabled}
            id={id}
            readOnly={readonly}
            value={value == null ? '' : value}
            rows={5}
            {...optionProps}
            {...cleanProps}
            onChange={_onChange}
            onBlur={typeof onBlur === 'function' && (event => onBlur(id, event.target.value))}
            onFocus={typeof onFocus === 'function' && (event => onFocus(id, event.target.value))}
        />
    );
}

TextAreaWidget.propTypes = {
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

TextAreaWidget.defaultProps = {
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

export default TextAreaWidget;
