import PropTypes from 'prop-types';
import AsyncReactSelect from 'react-select/lib/Async';
import React from 'react';
import { withTheme } from 'styled-components';

import DropdownIndicator from './DropdownIndicator';
import getSelectStyles from './SelectStyles';

/**
 * Shallow wrapper around the `react-select`.
 *
 * @method      AsyncSelect
 * @param       {Object} props The props for the component.
 * @constructor
 */
function AsyncSelect(props) {
    const {
        components,
        id,
        inputId,
        loadOptions,
        onChange,
        value,
        required,
        theme,
        ...rest
    } = props;
    // Create a ref for the input field.
    const inputRef = React.useRef(null);
    // Render a `ReactSelect` select options element.
    return (
        <div style={{ position: 'relative' }}>
            <AsyncReactSelect
                {...rest}
                classNamePrefix="RavenSelect-Async"
                components={{ DropdownIndicator, ...components }}
                id={id || inputId}
                loadOptions={loadOptions}
                menuPlacement="auto"
                ref={inputRef}
                required={required}
                styles={getSelectStyles(theme)}
                onChange={onChange}
                value={value}
                name={id}
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

AsyncSelect.propTypes = {
    /**
     * Components for the dropdown
     */
    components: PropTypes.object,
    /**
     * the dropdown identifier
     */
    id: PropTypes.string,
    /**
     * the dropdown's input identifier
     */
    inputId: PropTypes.string,
    /**
     * load options via API call, or async
     */
    loadOptions: PropTypes.func,
    /**
     * On Change Callback
     */
    onChange: PropTypes.func,
    /**
     * 'true' if the input value is required
     */
    required: PropTypes.bool,
    /**
     * the THEME object
     */
    theme: PropTypes.object,
    /**
     * Value of the input field
     */
    value: PropTypes.any,
};

AsyncSelect.defaultProps = {
    components: null,
    id: null,
    inputId: null,
    loadOptions: () => {},
    onChange: null,
    required: false,
    theme: null,
    // TODO: Remove once the 'required' hack is not needed
    // Setting to undefined to avoid passing null to the <input>
    value: undefined,
};

export default withTheme(AsyncSelect);
