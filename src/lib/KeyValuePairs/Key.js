import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const KeyValueKeyStyled = styled.p`
    flex: 1 1 35%;
    text-align: right;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('KeyValuePairsKey.styles')};
`;

export default KeyValueKeyStyled;
