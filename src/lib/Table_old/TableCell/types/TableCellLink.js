import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';

import { ButtonLink } from 'lib/Button';

const TableCellLink = ({ col, setRef, row, cellProps, ...rest }) => (
    <ButtonLink ref={setRef}>
        {_get(row, cellProps.key) || _get(row, col.id) || _get(cellProps, 'value')}
    </ButtonLink>
);

TableCellLink.propTypes = {
    cellProps: PropTypes.object,
    col: PropTypes.object,
    setRef: PropTypes.object,
    row: PropTypes.object,
};

TableCellLink.defaultProps = {
    cellProps: {},
    col: {},
    setRef: null,
    row: {},
};

export default TableCellLink;
