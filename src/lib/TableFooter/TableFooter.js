import styled from 'styled-components';

import { themeGet } from 'utils/theme';

/**
 * The `footer` component for the Table.
 *
 * @constructor
 */
const TableFooter = styled.tfoot`
    /**
     * Add all the remaining styles from the theme
     *
     */
    ${themeGet('TableFooter.styles')};
`;

export default TableFooter;
