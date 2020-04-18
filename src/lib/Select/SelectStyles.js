import { lighten, rgba } from 'polished';

import { COLORS } from 'constants/colors';
import { themeGet } from 'utils/theme';

/**
 * Generate styles for the `Select` input, based on the given `theme`.
 *
 * @method getSelectStyles
 * @param  {Object}        theme The theme from the `ThemeProvider`
 * @return {Object}              The updated styles for the `Select` input
 */
const getSelectStyles = ({
    borderRadius,
    boxShadow,
    customMenuPosition,
    elevation,
    elevationDirection,
    maxHeight,
    maxWidth,
    minControlHeight,
    minWidth,
    theme,
    width,
}) => {
    // Extract some colors from theme.
    const darkColor = themeGet(`palette.common.dark`)({ theme });
    const inputColor = themeGet(`palette.common.input`)({ theme });
    const inputDisabledColor = themeGet(`palette.common.inputDisabled`)({ theme });
    const lighterColor = themeGet(`palette.common.lighter`)({ theme });
    const placeholderColor = themeGet(`palette.common.placeholder`)({ theme });
    // Lighten / Darken the colors.
    const disabledColor = lighten(0.075, inputDisabledColor);
    const hoverColor = lighten(0.04, inputDisabledColor);
    // Return the select styles
    return {
        input: (provided, state) => {
            return {
                ...provided,
                color: inputColor,
                input: {
                    height: 'auto !important',
                },
            };
        },
        option: (provided, state) => {
            const { isDisabled, isSelected } = state;
            // Return the updated styles for the `option`.
            return {
                ...provided,
                '&:active': {
                    backgroundColor: inputDisabledColor,
                },
                '&:hover': {
                    backgroundColor: isDisabled ? disabledColor : isSelected ? null : hoverColor,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                },
                '&:last-of-type': {
                    borderBottomWidth: 0,
                },
                backgroundColor: isDisabled
                    ? disabledColor
                    : isSelected
                    ? inputDisabledColor
                    : 'transparent',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
                borderColor: lighterColor,
                color: isDisabled ? lighten(0.5, darkColor) : inputColor,
                lineHeight: 1.5,
                minHeight: 38,
                transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
            };
        },
        control: (provided, state) => {
            const { isFocused, isDisabled } = state;
            // Build the `focused` styles for the control.
            const focused = isFocused
                ? {
                      outline: 'none',
                      borderColor: COLORS.PRIMARY,
                      boxShadow: `inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px ${rgba(
                          COLORS.PRIMARY,
                          0.6
                      )}`,
                  }
                : null;
            // Return the updated styles for the `control`.
            return {
                ...provided,
                maxWidth,
                minHeight: minControlHeight || state.theme.spacing.controlHeight,
                minWidth,
                width,
                '&:hover': {
                    borderColor: isFocused
                        ? COLORS.PRIMARY
                        : themeGet('palette.common.lighter')({ theme }),
                },
                transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                borderColor: themeGet('palette.common.lighter')({ theme }),
                borderRadius: borderRadius || '4px',
                backgroundColor: isDisabled ? COLORS.INPUT_DISABLED : provided.backgroundColor,
                ...focused,
            };
        },
        menu: (provided, state) => {
            return {
                ...provided,
                borderColor: themeGet(`palette.common.lighter`)({ theme }),
                borderRadius: borderRadius || '4px',
                borderStyle: 'solid',
                borderWidth: '1px',
                boxShadow: themeGet(
                    `shadows[${elevationDirection}][${elevation}]`,
                    boxShadow
                )({
                    theme,
                }),
                marginTop: 4,
                position: customMenuPosition || 'absolute',
            };
        },
        menuList: (provided, state) => {
            return {
                ...provided,
                padding: 0,
                minHeight: 38,
                maxHeight: maxHeight || 300,
            };
        },
        loadingMessage: (provided, state) => {
            return {
                ...provided,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                minHeight: 38,
            };
        },
        noOptionsMessage: (provided, state) => {
            return {
                ...provided,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                minHeight: 38,
            };
        },
        placeholder: (provided, state) => {
            return {
                ...provided,
                color: placeholderColor,
            };
        },
        singleValue: (provided, state) => {
            return {
                ...provided,
                color: inputColor,
            };
        },
    };
};

export default getSelectStyles;
