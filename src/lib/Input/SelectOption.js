import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const SelectOptionStyled = styled.option`
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('SelectOption.styles')};
`;

export default SelectOptionStyled;
