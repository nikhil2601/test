import styled from 'styled-components';
import _get from 'lodash/get';

import { getThemeProps } from 'utils/theme';

const TableCellTitle = styled.div`
    color: #848484;
    display: block;
    flex: 1 1 30%;
    padding-right: 15px;
    text-align: right;
    /**
     * Add all of the remaining styles from the theme
     */
    ${getThemeProps('TableCellTitle.styles')};
    /**
     * If the orientation is in 'portrait' mode,
     * then force the display to be 'block' (visible)
     */
    ${({ orientation }) => ({
        display: _get(orientation, 'mode', 'landscape') === 'portrait' ? 'block' : 'none',
    })};
`;

export default TableCellTitle;
