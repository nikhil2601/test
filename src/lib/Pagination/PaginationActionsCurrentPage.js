import styled from 'styled-components';

import Input from 'lib/Input';
import { getThemeProps } from 'utils/theme';

const PaginationActionsCurrentPage = styled(Input)`
    border-radius: 4px;
    color: ${getThemeProps('palette.text.dark')};
    display: inline-block;
    height: 30px !important;
    margin: 0 15px;
    min-height: 30px;
    padding: 0;
    text-align: center;
    width: 55px;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('PaginationActionsCurrentPage.styles')};
`;

export default PaginationActionsCurrentPage;
