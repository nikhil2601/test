import styled, { css } from 'styled-components';

import Box from 'lib/Box';
import { THEME } from 'constants/theme';

import AccordionHeaderStyled from 'lib/AccordionHeader/AccordionHeaderStyled';

const AccordionStyled = styled(Box)`
    /**
     * Add in dynamic styles
     */
    ${({ expanded, single }) => {
        // Build the AccordionHeader border-bottom CSS.
        const accordionHeaderBorderBottomCSS =
            !expanded &&
            css`
                border-bottom-width: 0;
                transition: ${THEME.transitions.create('border-bottom-width', { duration: 150 })};
            `;
        // Styles when not rendering a single Accordion component.
        // Define the border-radius for the Accordion when rendered within a group.
        const notSingleAccordionCSS =
            !single &&
            css`
                &:not(:first-child):not(:last-child) {
                    border-radius: 0;
                }
                &:not(:last-child)&:first-child {
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                }
                &:not(:first-child)&:last-child {
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;
                }
                &:not(:first-child)&:nth-child(n) {
                    border-top-width: 0;
                }
            `;
        // Return the updated css.
        return css`
            ${notSingleAccordionCSS};
            ${AccordionHeaderStyled} {
                border-top-width: 0;
                border-right-width: 0;
                border-left-width: 0;
                ${accordionHeaderBorderBottomCSS};
            }
        `;
    }};
`;

export default AccordionStyled;
