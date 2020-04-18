import { css } from 'styled-components';

import { renderStyle } from 'utils/styled';
import { renderTableCellSize, verifyCSSColSize } from 'utils/css';
import { themeGet } from 'utils/theme';

const TableCellCSS = css`
    border-top: 1px solid ${themeGet('palette.common.lighter')};
    box-sizing: border-box;
    max-width: 100%;
    padding: 16px 12px;
    position: relative;
    text-align: ${({ align }) => align || 'left'};
    justify-content: ${({ align }) => align || 'left'};
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
    vertical-align: middle;
    /**
     * Add all the remaining styles from the theme
     *
     */
    ${themeGet('TableCell.styles')};
    /**
     * Add dynamic styles.
     */
    ${({ cellType, sortSchema, size, theme, type }) => {
        let headCss = '';
        let sortableCss = '';

        if (type === 'head') {
            headCss = css`
                background-color: #f5f8fa;
                border-top: none;
                color: #6c8193;
                font-weight: ${themeGet('typography.fontWeights.regular')};
                padding: 10px 12px;
                /**
                 * Add all the remaining styles from the theme
                 */
                ${themeGet('TableCell.styles.head')};
            `;
        }

        if (cellType === 'sortable') {
            sortableCss = css`
                cursor: pointer;
                > svg {
                    margin-left: ${sortSchema.iconPosition === 'right' ? '5px' : null};
                    margin-right: ${sortSchema.iconPosition === 'left' ? '5px' : null};
                    transform: ${sortSchema.order === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)'};
                }
                /**
                * Add all the remaining styles from the theme
                */
                ${themeGet('TableCell.styles.sortable')};
            `;
        }

        return css`
            ${headCss};
            ${sortableCss};
            ${renderStyle('size', size, theme, verifyCSSColSize, renderTableCellSize)};
        `;
    }};
`;

export default TableCellCSS;
