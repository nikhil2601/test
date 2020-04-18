import styled from 'styled-components';

import InputStyles from 'lib/Input/InputStyles';
import { themeGet } from 'utils/theme';

const TextAreaStyled = styled.textarea`
    ${InputStyles};
    height: unset;
    max-height: 225px; /* showing a maximum of about 10 rows */
    max-width: 100%;
    min-height: 119px; /* showing a minimum of about 5 rows */
    min-width: 100%;
    overflow: auto;
    padding: 6px 15px;
    resize: ${({ resize }) => resize || 'vertical'};
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('TextArea.styles')};
`;

export default TextAreaStyled;
