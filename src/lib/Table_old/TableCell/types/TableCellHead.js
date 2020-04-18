import _get from 'lodash/get';
import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

import TableCellCSS from '../TableCellCSS';

// eslint-disable-next-line valid-jsdoc
/**
 * A simple table cell styled as a header table-cell
 *
 * @type {Function}
 */
const TableCellHead = styled.th`
    ${TableCellCSS};

    font-weight: ${getThemeProps('typography.fontWeights.regular')};

    ${({ schema }) => {
        const iconPosition = _get(schema, 'sorting.iconPosition', null);
        return {
            '> svg': {
                marginLeft: iconPosition === 'right' ? '5px' : null,
                marginRight: iconPosition === 'left' ? '5px' : null,
            },
        };
    }};
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('TableCellHead.styles')};
`;

export default TableCellHead;
