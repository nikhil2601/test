import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

import PaginationActionsButton from './PaginationActionsButton';

const PaginationActionsButtonContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    /**
     * Style the interior Button
     */
    ${PaginationActionsButton} {
        &:first-of-type {
            border-bottom-right-radius: 0;
            border-right: 0;
            border-top-right-radius: 0;
        }
        &:last-of-type {
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
        }
    }
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('PaginationActionsButtonContainer.styles')};
`;

export default PaginationActionsButtonContainer;
