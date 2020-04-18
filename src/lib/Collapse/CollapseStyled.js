import styled, { css } from 'styled-components';

const CollapseStyled = styled.div`
    ${({ entered, isHidden, minHeight, theme }) => {
        // Build the `entered` styles
        const enteredCss =
            entered &&
            css`
                height: auto;
                overflow: visible;
            `;
        // Build the `hidden` styles
        const hiddenCss =
            isHidden &&
            css`
                visibility: hidden;
            `;
        // Return the component's styles
        return css`
            height: 0;
            min-height: ${minHeight};
            overflow: hidden;
            transition: ${theme.transitions.create('height')};
            ${enteredCss};
            ${hiddenCss};
        `;
    }};
`;

export default CollapseStyled;
