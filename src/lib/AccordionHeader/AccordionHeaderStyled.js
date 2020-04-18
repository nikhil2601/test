import styled from 'styled-components';

import Box from 'lib/Box';
import { THEME } from 'constants/theme';

// Define styles for the AccordionHeader.
const AccordionHeaderStyled = styled(Box)`
    cursor: pointer;
    transition: ${THEME.transitions.create('background-color')};
    ${({ disabled }) => {
        if (disabled) {
            return {
                cursor: 'default',
            };
        }
    }}
`;

export default AccordionHeaderStyled;
