import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Row from 'lib/Row';
import Typography from 'lib/Typography';
import { formatNumberWithDelimiter } from 'utils/number';
import { themeGet } from 'utils/theme';

const PaginationTotalRowsStyled = styled(Row)`
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('PaginationTotalRows.styles')};
`;

function PaginationTotalRows(props) {
    const { label: labelProps, totalRows } = props;

    const label = typeof labelProps === 'string' && labelProps;
    const prefix = typeof labelProps !== 'string' && labelProps.prefix;
    const suffix = typeof labelProps !== 'string' && labelProps.suffix;
    const total = formatNumberWithDelimiter(totalRows || 0);

    return (
        <PaginationTotalRowsStyled
            alignItems="center"
            gutter={false}
            justify="flex-start"
            width="auto"
        >
            {label && (
                <Typography
                    color="text"
                    gutterBottom="0"
                    gutterRight="4px"
                    gutterTop="0"
                    type="paginationLabel"
                >
                    {label}
                </Typography>
            )}
            {prefix && (
                <Typography
                    color="text"
                    gutterBottom="0"
                    gutterRight="4px"
                    gutterTop="0"
                    type="paginationLabel"
                >
                    {prefix}
                </Typography>
            )}
            <Typography
                color="text"
                gutterBottom="0"
                gutterRight="4px"
                gutterTop="0"
                type="paginationLabel"
            >
                {total}
            </Typography>
            {suffix && (
                <Typography color="text" gutterBottom="0" gutterTop="0" type="paginationLabel">
                    {suffix}
                </Typography>
            )}
        </PaginationTotalRowsStyled>
    );
}

PaginationTotalRows.propTypes = {
    /**
     * The display label for the total rows
     */
    label: PropTypes.oneOfType([
        PropTypes.shape({
            prefix: PropTypes.node,
            suffix: PropTypes.node,
        }),
        PropTypes.string,
    ]),
    /**
     * The number of total rows.
     */
    totalRows: PropTypes.number,
};

PaginationTotalRows.defaultProps = {
    label: '',
    totalRows: 0,
};

export default PaginationTotalRows;
