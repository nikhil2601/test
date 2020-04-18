import PropTypes from 'prop-types';
import React from 'react';

import ButtonGroup from 'lib/ButtonGroup';

function TableCellButtonGroup(props) {
    const { cellProps: tableCellProps, handlers, row } = props;
    const { type, buttons, ...rest } = tableCellProps;
    // Return the built ButtonGroup Component.
    return <ButtonGroup buttons={buttons} handlers={handlers} invokeWith={row} {...rest} />;
}

TableCellButtonGroup.propTypes = {
    cellProps: PropTypes.object,
    handlers: PropTypes.object,
    row: PropTypes.object,
};

TableCellButtonGroup.defaultProps = {
    cellProps: {},
    handlers: {},
    row: {},
};

export default TableCellButtonGroup;
