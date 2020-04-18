import PropTypes from 'prop-types';
import React from 'react';

import { Select, SelectOption } from 'lib/Input';

/**
 * Parse a value out as a number
 *
 * @method parseAsNumber
 * @param  {Any}         value The value to parse
 * @return {Any|number}        The value
 */
const parseAsNumber = value => {
    if (value === '') {
        return undefined;
    }
    // "1." isn't considered a number, even if JavaScript parses it fine.
    // The user is most likely entereing in a floating point integer.
    if (/\.$/.test(value)) {
        return value;
    }
    // "1.0" isn't considered a number, but a floating point number (float).
    // We should return the string, to allow for float inputs.
    if (/\.0$/.test(value)) {
        return value;
    }
    // If we're truly working with a number and not a float,
    // let's parse it via Number() and see if it is a valid Number.
    const num = Number(value);
    const isNumber = typeof num === 'number' && !Number.isNaN(num);
    // Fantastic, it's a number!
    // Now we should return it as a string so that it doesn't conflict
    // with the user entering in a currency symbol or any other value.
    if (/\.\d*0$/.test(value)) {
        return value;
    }
    // Return the valid number or the passed in value in the end.
    return isNumber ? num : value;
};

/**
 * Get the select widgets value
 *
 * @method getSelectWidgetValue
 * @param  {Object}             schema The form schema
 * @param  {Any}                value  The value for the select widget
 * @return {Any}                       The final value
 */
const getSelectWidgetValue = ({ type, items }, value) => {
    const NUMBER_INT = ['number', 'integer'];

    if (value === '') {
        return undefined;
    } else if (type === 'array' && items && NUMBER_INT.includes(items.type)) {
        return value.map(parseAsNumber);
    } else if (type === 'boolean') {
        return value === 'true';
    } else if (type === 'number') {
        return parseAsNumber(value);
    }

    return value;
};

/**
 * Extract the select input value based on regular or multiple select
 *
 * @method getSelectInputValue
 * @param  {Event}              event    The synthetic event
 * @param  {boolean}            multiple The multiple select attr
 * @return {Any}                         The value
 */
const getSelectInputValue = (event, multiple) => {
    if (multiple) {
        return [].slice
            .call(event.target.options)
            .filter(option => option.selected)
            .map(option => option.value);
    }
    return event.target.value;
};

function SelectWidget(props) {
    const {
        autofocus,
        disabled,
        id,
        multiple,
        onBlur,
        onChange,
        onFocus,
        options,
        placeholder,
        readonly,
        required,
        schema,
        value,
    } = props;
    const { enumOptions, enumDisabled } = options;
    const emptyValue = multiple ? [] : '';

    return (
        <Select
            id={id}
            multiple={multiple}
            value={typeof value === 'undefined' ? emptyValue : value}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            onBlur={
                onBlur &&
                (event => {
                    const newValue = getSelectInputValue(event, multiple);
                    onBlur(id, getSelectWidgetValue(schema, newValue));
                })
            }
            onFocus={
                onFocus &&
                (event => {
                    const newValue = getSelectInputValue(event, multiple);
                    onFocus(id, getSelectWidgetValue(schema, newValue));
                })
            }
            onChange={event => {
                const newValue = getSelectInputValue(event, multiple);
                onChange(getSelectWidgetValue(schema, newValue));
            }}
        >
            {!multiple && !schema.default && (
                <SelectOption value="" disabled>
                    {placeholder}
                </SelectOption>
            )}
            {enumOptions.map(({ value, label }, idx) => {
                const disabledOption = enumDisabled && enumDisabled.indexOf(value) !== -1;
                const key = `${label}_${idx}`;

                return (
                    <SelectOption key={key} value={value} disabled={disabledOption}>
                        {label}
                    </SelectOption>
                );
            })}
        </Select>
    );
}

SelectWidget.propTypes = {
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.shape({
        enumOptions: PropTypes.array,
    }).isRequired,
    placeholder: PropTypes.string,
    readonly: PropTypes.bool,
    required: PropTypes.bool,
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
};

SelectWidget.defaultProps = {
    autofocus: false,
    disabled: false,
    multiple: false,
    onBlur: null,
    onChange: null,
    onFocus: null,
    placeholder: 'Select an option',
    readonly: false,
    required: false,
    value: '',
};

export default SelectWidget;
