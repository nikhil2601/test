import PropTypes from 'prop-types';
import React from 'react';

import Checkbox from 'lib/Checkbox';

const TableCellCheckbox = props => {
    const { setRef, row, cellProps, ...rest } = props;
    const checked = Boolean(row.selected) === true || null;

    return <Checkbox inputRef={setRef} {...rest} checked={checked} />;
};

TableCellCheckbox.propTypes = {
    cellProps: PropTypes.object,
    row: PropTypes.object,
    setRef: PropTypes.object,
};

TableCellCheckbox.defaultProps = {
    cellProps: {},
    row: null,
    setRef: null,
};

export default TableCellCheckbox;
