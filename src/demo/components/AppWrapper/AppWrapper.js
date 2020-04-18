import styled from 'styled-components';

import { getThemeProps } from 'pep-comp';

const AppWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    width: 100%;
    z-index: 0;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('AppWrapper.styles')};
`;

export default AppWrapperStyled;
