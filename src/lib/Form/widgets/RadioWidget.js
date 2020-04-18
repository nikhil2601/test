import React from 'react';
import PropTypes from 'prop-types';

import Box from 'lib/Box';
import Radio from 'lib/Radio';
import Typography from 'lib/Typography';
import { genID } from 'utils/generate';

function RadioWidget(props) {
    const { autofocus, disabled, id, onChange, options, readonly, required, value } = props;
    // Generate a unique field name to identify this set of radio buttons.
    const name = genID('RadioWidget__');
    // Extract props from the options.
    const { boxProps = {}, enumOptions, enumDisabled, inline } = options;
    // Render the `RadioWidget`.
    return (
        <Box borderRadius="0" borderWidth="0" margin="0" padding="0 5px" {...boxProps}>
            {enumOptions.map((option, optionIdx) => {
                const checked = option.value === value;
                const itemDisabled = enumDisabled && enumDisabled.indexOf(option.value) !== -1;
                const key = `${name}__${id}__${optionIdx}`;
                // Build the single radio.
                return (
                    <Typography
                        fullWidth={inline ? null : true}
                        gutterRight={inline ? '20px' : null}
                        htmlFor={key}
                        key={key}
                        type="label"
                    >
                        <Radio
                            autoFocus={autofocus && optionIdx === 0}
                            checked={checked}
                            disabled={disabled || itemDisabled || readonly}
                            id={key}
                            margin="0 5px 0 0"
                            name={name}
                            onChange={() => onChange(option.value)}
                            required={required}
                            value={option.value}
                        />
                        <span>{option.label}</span>
                    </Typography>
                );
            })}
        </Box>
    );
}

RadioWidget.propTypes = {
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.shape({
        enumOptions: PropTypes.array,
        inline: PropTypes.bool,
    }),
    readonly: PropTypes.bool,
    required: PropTypes.bool,
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
};

RadioWidget.defaultProps = {
    autofocus: false,
    disabled: null,
    onChange: null,
    options: null,
    readonly: null,
    required: null,
    value: null,
};

export default RadioWidget;
