import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const PaginationActionsLastPage = styled.span`
    color: ${getThemeProps('palette.text.light')};
    margin: 0 10px;
    max-height: 33px;
    text-align: center;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('PaginationActionsLastPage.styles')};
`;

export default PaginationActionsLastPage;
