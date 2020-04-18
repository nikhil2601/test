import styled, { css } from 'styled-components';

const SwitchStyled = styled.div`
    ${({ isDisabled }) => css`
        align-items: center;
        cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
        display: flex;
        max-height: 25px;
        max-width: 55px;
        opacity: ${isDisabled ? 0.5 : null};
        position: relative;
        vertical-align: middle;
        z-index: 1;
        margin: ${({ margin }) => margin || 'inherit'};
    `};
`;

export default SwitchStyled;
