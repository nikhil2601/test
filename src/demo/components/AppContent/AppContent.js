import styled from 'styled-components';

import { getThemeProps } from 'pep-comp';

const AppContent = styled.div`
    flex: 1 1 auto;
    position: relative;
    width: 100%;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('AppContent.styles')};
`;

export default AppContent;
