import styled from 'styled-components';

import Button from 'lib/Button';
import { themeGet } from 'utils/theme';

const PaginationActionsButton = styled(Button)`
    align-items: center;
    display: flex;
    font-size: 12px;
    height: 30px;
    justify-content: center;
    min-height: 30px;
    min-width: auto;
    padding: 5px;
    width: 45px;
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('PaginationActionsButton.styles')};
`;

export default PaginationActionsButton;
