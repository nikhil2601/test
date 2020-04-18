import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

import Key from './Key';

const KeyItemStyled = styled.li`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    ${Key} {
        margin-right: 10px;
    }
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('KeyValuePairsItem.styes')};
`;

export default KeyItemStyled;
