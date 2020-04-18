import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const PaginationActionsOf = styled.span`
    color: ${getThemeProps('palette.text.light')};
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('PaginationActionsOf.styles')};
`;

export default PaginationActionsOf;
