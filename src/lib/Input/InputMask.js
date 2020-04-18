import PropTypes from 'prop-types';
import React from 'react';
import MaskedInput, { conformToMask } from 'react-text-mask';

import Input from './Input';

/**
 * An Input Mask component, encapsulating the default Input Component.
 * See the @link for more documentation on how to use the Input Mask.
 *
 * @see {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md}
 * @method      InputMask
 * @param       {Object}  props The props
 * @constructor
 */
function InputMask(props) {
    const { disabled, mask, onChange, placeholder, value, required } = props;
    // Transform the passed in value via the given mask.
    const conformedValue =
        Array.isArray(mask) && mask.length > 0 && value
            ? conformToMask(`${value}`, mask).conformedValue
            : value;

    function render(ref, inputProps) {
        return <Input ref={ref} {...inputProps} />;
    }

    return (
        <MaskedInput
            disabled={disabled}
            required={required}
            value={conformedValue}
            mask={mask}
            onChange={onChange}
            placeholder={placeholder}
            render={render}
        />
    );
}

InputMask.propTypes = {
    disabled: PropTypes.bool,
    /**
     * Array or a function that defines how the user input is going to be masked
     */
    mask: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    required: PropTypes.bool,
};

InputMask.defaultProps = {
    disabled: false,
    mask: null,
    placeholder: '',
    required: false,
    value: null,
};

export default InputMask;
