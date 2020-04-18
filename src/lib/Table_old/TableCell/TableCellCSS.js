import _get from 'lodash/get';
import { css } from 'styled-components';

import SvgIcon from 'lib/SvgIcon';
import { getThemeProps } from 'utils/theme';
import { mergeObjects } from 'utils/merge';

const TableCellCSS = css`
    align-items: baseline;
    border-top: 1px solid ${getThemeProps('palette.common.lighter')};
    display: flex;
    padding: 16px 12px;
    position: relative;
    text-align: left;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
    vertical-align: middle;
    /**
     * Display as a regular table cell above mobile view.
     */
    ${({ theme }) => theme.media.up('sm')`
        display: table-cell;
    `};
    /**
     * Add all of the remaining styles from the theme
     */
    ${getThemeProps('TableCell.styles')};
    /**
     * Style the inner SvgIcon component
     */
    ${SvgIcon} {
        transform: ${props => {
            const order = _get(props, 'order');
            const orderBy = _get(props, 'orderBy');
            const colId = _get(props, 'col.id');

            return orderBy === colId && order === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)';
        }};
    }
    /**
     * Add in dynamic styles
     */
    ${({ cellProps, orientation, position, theme }) => {
        const cellType = cellProps.type || 'default';
        const orientationModePortrait = _get(orientation, 'mode') === 'portrait';

        const dynamicStyles = {};

        const portraitStyles = orientationModePortrait
            ? getThemeProps('TableCell.styles.portrait', null, {
                  theme,
              })
            : {};
        const positionStyles = getThemeProps(`TableCell.${position}.styles`, null, { theme });
        const cellTypeStyles = getThemeProps(`TableCell.${cellType}.styles`, {}, { theme });

        return mergeObjects(dynamicStyles, portraitStyles, cellTypeStyles, positionStyles);
    }};
`;

export default TableCellCSS;
