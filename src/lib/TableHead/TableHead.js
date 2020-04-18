import styled from 'styled-components';

import { themeGet } from 'utils/theme';

/**
 * The `header` component for the Table.
 *
 * @constructor
 */
const TableHead = styled.thead`
    /**
     * Add all the remaining styles from the theme
     *
     */
    ${themeGet('TableHead.styles')};
`;

export default TableHead;
