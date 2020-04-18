import styled from 'styled-components';

import { themeGet } from 'utils/theme';

/**
 * The `body` component for the Table.
 *
 * @constructor
 */
const TableBody = styled.tbody`
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('TableBody.styles')};
`;

export default TableBody;
