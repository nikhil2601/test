import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from 'constants/colors';
import { getThemeProps } from 'utils/theme';

const Button = styled.button`
    /**
     * Add in basic styles
     */
    -moz-appearance: none;
    -webkit-appearance: none;
    background: linear-gradient(to top, #1991eb, #2da1f8);
    border: ${({ border }) => (border ? '1px solid transparent' : 'none')};
    color: inherit;
    cursor: pointer;
    display: inline-block;
    outline: none;
    position: relative;
    text-align: ${({ align }) => align || 'center'};
    text-decoration: none;
    text-transform: initial;
    transition: box-shadow 0.2s ease-in;
    user-select: none;
    vertical-align: middle;
    &::-moz-focus-inner {
        border-style: none;
    }
    &:disabled {
        cursor: ${({ disabledCursor }) => disabledCursor || 'not-allowed'};
        opacity: ${({ disabledOpacity }) => disabledOpacity || 0.5};
    }
    &:focus {
        outline: none;
    }
    /**
     * Add in the button typography styles
     */
    ${getThemeProps('typography.button')};
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('Button.styles')};
    /**
     * Add in the dynamic styles
     */
    ${({
        active,
        borderRadius,
        color: colorProps,
        disabledCursor,
        disabledOpacity,
        height,
        margin,
        minHeight: minHeightProps,
        noMinHeight,
        noMinWidth,
        noPaddingX,
        noPaddingY,
        padding: paddingProps,
        softDisable: softDisableProps,
        theme,
        width,
    }) => {
        let background = getThemeProps(
            `palette.${colorProps}.gradientColor`,
            COLORS.PRIMARY_GRADIENT,
            {
                theme,
            }
        );
        const defaultColor = getThemeProps(`palette.${colorProps}.color`, COLORS.PRIMARY, {
            theme,
        });
        let color = getThemeProps(`palette.${colorProps}.text`, COLORS.WHITE, {
            theme,
        });
        const hoverColor = getThemeProps(`palette.${colorProps}.hoverColor`, color, { theme });
        const borderColor = getThemeProps(`palette.${colorProps}.borderColor`, COLORS.PRIMARY, {
            theme,
        });
        const focusColor = getThemeProps(`palette.${colorProps}.focusColor`, COLORS.FOCUS, {
            theme,
        });
        let padding = paddingProps;
        const minWidth = noMinWidth
            ? 'auto'
            : getThemeProps('Button.styles.minWidth', '152px', {
                  theme,
              });
        const minHeight = noMinHeight ? 'auto' : minHeightProps || '36px';

        const softDisable = softDisableProps
            ? {
                  background: defaultColor,
                  color: hoverColor,
                  cursor: disabledCursor || 'not-allowed',
                  opacity: disabledOpacity || 0.4,
              }
            : {};

        if (noPaddingX && noPaddingY) {
            padding = '0';
        } else if (noPaddingX) {
            padding = `10px 0`;
        } else if (noPaddingY) {
            padding = `0 25px`;
        }

        if (active) {
            background = defaultColor;
            color = hoverColor;
        }

        return {
            background,
            borderColor,
            borderRadius: borderRadius || '4px',
            color,
            height,
            margin,
            minHeight,
            minWidth,
            padding,
            width,
            '&:hover': {
                background: defaultColor,
                color: hoverColor,
            },
            '&:active': {
                background: defaultColor,
                color: hoverColor,
            },
            '&:disabled': {
                background,
                color,
            },
            '&:focus': {
                boxShadow: `0 0 0 3px ${focusColor}`,
            },
            ...softDisable,
        };
    }};
`;

Button.propTypes = {
    /**
     * Set the state of the button to 'active'.
     */
    active: PropTypes.bool,
    /**
     * Set the `text-align` css property.
     */
    align: PropTypes.string,
    /**
     * Add a `1px` border to the button.
     */
    border: PropTypes.bool,
    /**
     * Set the `border-radius` css property.
     */
    borderRadius: PropTypes.string,
    /**
     * The content of the button.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * Apply themed styling to Button.
     *
     * Colors can be defined in `theme.palette`.
     */
    color: PropTypes.string,
    /**
     * Set the disabled cursor for the `disabled` button state.
     */
    disabledCursor: PropTypes.string,
    /**
     * Set an opacity for the `disabled` button state.
     */
    disabledOpacity: PropTypes.number,
    /**
     * Set the `margin` css property.
     */
    margin: PropTypes.string,
    /**
     * Set the `min-height` css property.
     */
    minHeight: PropTypes.string,
    /**
     * Do not apply a minimum height to the button.
     */
    noMinHeight: PropTypes.bool,
    /**
     * Do not apply a minimum width to the button.
     */
    noMinWidth: PropTypes.bool,
    /**
     * Default onClick handler for the button
     */
    onClick: PropTypes.func,
    /**
     * Set the `padding` css property.
     */
    padding: PropTypes.string,
    /**
     * Softly `disable` the button without passing in the prop to the HTML DOM element.
     * This helps keep DOM synthetic events alive.
     */
    softDisable: PropTypes.bool,
    /**
     * Give the button a set width.
     */
    width: PropTypes.string,
};

Button.defaultProps = {
    active: false,
    align: null,
    border: false,
    borderRadius: null,
    children: null,
    className: '',
    color: 'primary',
    disabledCursor: null,
    disabledOpacity: null,
    margin: '0',
    minHeight: null,
    noMinHeight: false,
    noMinWidth: false,
    onClick: () => {},
    padding: '5px 15px',
    softDisable: null,
    width: null,
};

export default Button;
