import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const TableCellChild = styled.div`
    flex: 1 1 70%;
    display: inline-block;
    ${({ noDataAvailable }) => noDataAvailable && { width: '100%' }};
    /**
     * Add all of the remaining styles from the theme
     */
    ${getThemeProps('TableCellChild.styles')};
`;

export default TableCellChild;
