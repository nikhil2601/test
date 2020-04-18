import styled from 'styled-components';

import { themeGet } from 'utils/theme';

const TableCellChild = styled.div`
    width: 100%;
    /**
     * Add all of the remaining styles from the theme
     */
    ${themeGet('TableCellChild.styles')};
`;

export default TableCellChild;
