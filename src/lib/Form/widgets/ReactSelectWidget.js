import React from 'react';
import PropTypes from 'prop-types';

import Select from 'lib/Select';
import { parseAsNumber } from 'utils/number';

/**
 * Extract the select input value based on regular or multiple select
 *
 * @method getSelectInputValue
 * @param  {Event}              event    The synthetic event
 * @param  {boolean}            multiple The multiple select attr
 * @return {Any}                         The value
 */
const getSelectInputValue = (event, multiple) => {
    return Array.isArray(event) ? event.map(option => option.value) : event.value;
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
 * A simple Select componened wrapped in a form-field.
 *
 * @method      ReactSelectWidget
 * @param       {Object}          props The props for the component
 * @constructor
 */
function ReactSelectWidget(props) {
    const {
        disabled,
        id,
        multiple,
        onChange,
        options,
        placeholder: placeholderProps,
        required,
        schema,
        value: valueProps,
        readonly,
    } = props;
    // Fix the placeholder, when rendering inside a `<Form />` at times the
    // `placeholder` is set to an empty string if not provided in the form-schema.
    // Due to this, the `defaultProps` don't help since an empty string is a valid value.
    const placeholder = placeholderProps || '-- Select an Option --';
    // Extract out the `enumOptions` from the form field.
    const { enumOptions, menuPlacement, onChange: optionsOnChange = null } = options;
    // Find the value item in the list of `enumOptions`.
    const value = enumOptions.find(option => option.value === valueProps) || null;
    // `onChange` handler for the `Select`.
    const _handleOnChange = event => {
        const newValue = getSelectInputValue(event);
        const onChangeValue = getSelectWidgetValue(schema, newValue);
        // Fire the `onChange` passed in from the Form.
        typeof onChange === 'function' && onChange(onChangeValue);
        // Call the `onChange` handler if available from the options.
        typeof optionsOnChange === 'function' && optionsOnChange(onChangeValue);
    };
    // Render the default `Select` component.
    return (
        <Select
            inputId={id}
            isDisabled={disabled || readonly}
            isMulti={multiple}
            menuPlacement={menuPlacement}
            onChange={_handleOnChange}
            options={enumOptions || []}
            placeholder={placeholder}
            required={required}
            value={value}
        />
    );
}

ReactSelectWidget.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
    readonly: PropTypes.bool,
};

ReactSelectWidget.defaultProps = {
    disabled: null,
    multiple: null,
    options: null,
    placeholder: null,
    required: null,
    value: null,
    readonly: null,
};

export default ReactSelectWidget;
