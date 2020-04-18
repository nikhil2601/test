import styled, { css } from 'styled-components';

import Box from 'lib/Box';

import TableStyled from './TableStyled';

/**
 * A wrapper element around the Table component.
 *
 * @constructor
 */
const TableWrapper = styled(Box)`
    border-collapse: initial;
    margin: 0;
    overflow: visible;
    overflow-x: auto;
    padding: 0;
    /**
     * Add in dynamic styles based on column sizing.
     */
    ${TableStyled} {
        ${({ cols }) => {
            let minWidth = '';

            switch (cols) {
                case 1:
                case 2:
                    minWidth = '100%';
                    break;
                case 3:
                    minWidth = '600px';
                    break;
                case 4:
                    minWidth = '800px';
                    break;
                case 5:
                case 6:
                case 7:
                    minWidth = '900px';
                    break;
                case 8:
                    minWidth = '1000px';
                    break;
                case 9:
                    minWidth = '1100px';
                    break;
                case 10:
                    minWidth = '1200px';
                    break;
                case 11:
                    minWidth = '1300px';
                    break;
                case 12:
                    minWidth = '1400px';
                    break;
                default:
                    break;
            }

            return css`
                min-width: ${minWidth};
            `;
        }}
    }
`;

export default TableWrapper;
