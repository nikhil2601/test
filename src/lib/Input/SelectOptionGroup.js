import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const SelectOptionGroupStyled = styled.optgroup`
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('SelectOptionGroup.styles')};
`;

export default SelectOptionGroupStyled;
