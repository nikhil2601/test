import styled from 'styled-components';

import { themeGet } from 'utils/theme';

const TableStyled = styled.table`
    border-collapse: collapse;
    overflow: hidden;
    overflow-x: auto;
    width: 100%;
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('Table.styles')};
`;

export default TableStyled;
