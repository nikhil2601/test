import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';

import SvgIcon from 'lib/SvgIcon';

function TableCellSvg(props) {
    const { setRef, cellProps } = props;
    const iconType = _get(cellProps, 'value');

    if (SvgIcon.types[iconType]) {
        const Icon = SvgIcon.types[iconType];
        return <Icon setRef={setRef} style={{ width: 22, height: 22 }} {...cellProps} />;
    }

    return null;
}

TableCellSvg.propTypes = {
    cellProps: PropTypes.object,
    setRef: PropTypes.object,
};

TableCellSvg.defaultProps = {
    cellProps: {},
    setRef: null,
};

export default TableCellSvg;
