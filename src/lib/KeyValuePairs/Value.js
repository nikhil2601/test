import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const KeyValueStyled = styled.p`
    flex: 1 1 65%;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('KeyValuePairsValue.styles')};
`;

export default KeyValueStyled;
