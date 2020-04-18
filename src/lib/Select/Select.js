import PropTypes from 'prop-types';
import React from 'react';
import ReactSelect from 'react-select';
import { withTheme } from 'styled-components';

import DropdownIndicator from './DropdownIndicator';
import getSelectStyles from './SelectStyles';

/**
 * Shallow wrapper around the `react-select`.
 *
 * @method      Select
 * @param       {Object} props The props for the component.
 * @constructor
 */
function Select(props) {
    const {
        components,
        id,
        inputId,
        menuPlacement,
        onChange,
        required,
        theme,
        value,
        ...rest
    } = props;
    // Create a ref for the input field.
    const inputRef = React.useRef(null);
    // Render a `ReactSelect` select options element.
    return (
        <div style={{ position: 'relative' }}>
            <ReactSelect
                classNamePrefix="RavenSelect"
                components={{ DropdownIndicator, ...components }}
                menuPlacement={menuPlacement}
                ref={inputRef}
                onChange={onChange}
                id={id || inputId}
                {...rest}
                styles={getSelectStyles(props)}
                required={required}
                value={value}
            />
            {/*
                FIXME: HACK !!!!
                react-select do not pass down the 'required' props to the HTML <input> in v2.x
                Please refer:
                - https://github.com/JedWatson/react-select/issues/3140
                - https://github.com/JedWatson/react-select/issues/2751

                So here we are having a hidden <input> which will hold the similar
                value to the actual dropdown. But it will be used for the native HTML validation.

                This piece can be removed once the library provide support for the
                'required' prop in future.
            */}
            <input
                id={`${id || inputId}__hidden`}
                tabIndex={-1}
                value={value || ''}
                required={required}
                onChange={onChange}
                style={{
                    height: '100%',
                    left: 0,
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    zIndex: -100,
                }}
                onFocus={() => inputRef.current.focus()}
            />
        </div>
    );
}

Select.propTypes = {
    components: PropTypes.object,
    /**
     * Shadow depth for the box.
     * Accepts values between 0 and 24.
     */
    elevation: PropTypes.number,
    /**
     * Direction for the shadow depth for the box.
     * Accepts either `top` or `bottom`.
     */
    elevationDirection: PropTypes.oneOf(['top', 'bottom']),
    id: PropTypes.string,
    inputId: PropTypes.string,
    menuPlacement: PropTypes.string,
    /**
     * On Change Callback
     */
    onChange: PropTypes.func,
    /**
     * 'true' if the input value is required
     */
    required: PropTypes.bool,
    theme: PropTypes.object,
    /**
     * Value of the input field
     */
    value: PropTypes.any,
};

Select.defaultProps = {
    components: null,
    elevation: 10,
    elevationDirection: 'bottom',
    id: null,
    inputId: null,
    menuPlacement: 'auto',
    onChange: null,
    required: false,
    theme: null,
    // TODO: Remove once the 'required' hack is not needed
    // Setting to undefined to avoid passing null to the <input>
    value: undefined,
};

export default withTheme(Select);
