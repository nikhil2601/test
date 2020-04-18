import { css } from 'styled-components';

import { themeGet } from 'utils/theme';

/**
 * Define the CSS Styles for the Input Component
 */
const InputCss = css`
    background-color: ${themeGet('palette.common.white')};
    border-color: ${themeGet('palette.common.lighter')};
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-shadow: none;
    color: ${themeGet('palette.common.input')};
    display: block;
    font-size: 14px;
    height: 38px;
    line-height: 1.5;
    padding: 6px 15px;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    width: 100%;
    &::placeholder {
        color: ${themeGet('palette.common.placeholder')};
    }
    /**
     * Add in some focus effects
     */
    ${themeGet('effects.inputFocus')};
    /**
     * Add styles for disabled and read-only
     */
    &[disabled],
    &[readonly] {
        background-color: #e1e5e9 !important;
        border-color: transparent;
        box-shadow: none;
        cursor: not-allowed;
        user-select: none;
    }
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('Input.styles')};
`;

export default InputCss;
