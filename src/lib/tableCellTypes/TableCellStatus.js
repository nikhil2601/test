import PropTypes from 'prop-types';
import React from 'react';
import _toString from 'lodash/toString';

import Status from 'lib/Status';

function TableCellStatus(props) {
    const { col, setRef, row, cellProps } = props;

    const enums = cellProps.enum || [];
    let value =
        _toString(row[cellProps.key]) || _toString(row[col.id]) || _toString(cellProps.value);

    const foundValue = enums.find(e => Object.hasOwnProperty.call(e, 'value') && e.value === value);
    const type = (foundValue && foundValue.type) || '';

    if (enums.length && foundValue) {
        value = foundValue.text || '';
    }

    value = value || '-';

    return (
        <Status ref={setRef} value={value} color={type}>
            {value}
        </Status>
    );
}

TableCellStatus.propTypes = {
    cellProps: PropTypes.object,
    col: PropTypes.object,
    setRef: PropTypes.object,
    row: PropTypes.object,
};

TableCellStatus.defaultProps = {
    cellProps: {},
    col: {},
    setRef: null,
    row: {},
};

export default TableCellStatus;
