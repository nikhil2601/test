import PropTypes from 'prop-types';
import React from 'react';

import TableStyled from './TableStyled';
import TableWrapper from './TableWrapper';

/**
 * A simple `table` component.
 *
 * @constructor
 */
const Table = React.forwardRef((props, ref) => {
    const { boxProps, cols, ...rest } = props;

    return (
        <TableWrapper elevation={5} {...boxProps} cols={cols}>
            <TableStyled {...rest} cols={cols} ref={ref} />
        </TableWrapper>
    );
});

Table.displayName = 'Table';

Table.propTypes = {
    /**
     * The props applied to the inner `TableWrapper` component.
     */
    boxProps: PropTypes.object,
    /**
     * The amount of columns that are being rendered.
     */
    cols: PropTypes.number,
};

Table.defaultProps = {
    boxProps: null,
    cols: 12,
};

export default Table;
