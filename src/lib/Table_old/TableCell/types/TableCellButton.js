import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';

import Button from 'lib/Button';

const TableCellButton = ({ col, setRef, row, cellProps, ...rest }) => (
    <Button ref={setRef} {...rest}>
        {_get(row, cellProps.key) || _get(row, col.id) || _get(cellProps, 'value')}
    </Button>
);

TableCellButton.propTypes = {
    cellProps: PropTypes.object,
    col: PropTypes.object,
    setRef: PropTypes.object,
    row: PropTypes.object,
};

TableCellButton.defaultProps = {
    cellProps: {},
    col: null,
    setRef: null,
    row: {},
};

export default TableCellButton;
