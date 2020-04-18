import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Row from 'lib/Row';
import Typography from 'lib/Typography';
import { formatNumberWithDelimiter } from 'utils/number';
import { themeGet } from 'utils/theme';

const PaginationTotalSelectedStyled = styled(Row)`
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('PaginationTotalRows.styles')};
`;

function PaginationTotalSelected(props) {
    const { count, label: labelProps } = props;

    const label = typeof labelProps === 'string' && labelProps;
    const prefix = typeof labelProps !== 'string' && labelProps.prefix;
    const suffix = typeof labelProps !== 'string' && labelProps.suffix;

    return (
        <PaginationTotalSelectedStyled
            margin="5px 0 0"
            alignItems="center"
            gutter={false}
            justify="flex-start"
        >
            {label && (
                <Typography
                    color="text"
                    gutterBottom="0"
                    gutterRight="4px"
                    type="paginationTotalSelected"
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
                    type="paginationTotalSelected"
                >
                    {prefix}
                </Typography>
            )}
            <Typography
                color="text"
                gutterBottom="0"
                gutterRight="4px"
                gutterTop="0"
                type="paginationTotalSelected"
            >
                {formatNumberWithDelimiter(count)}
            </Typography>
            {suffix && (
                <Typography
                    color="text"
                    gutterBottom="0"
                    gutterTop="0"
                    type="paginationTotalSelected"
                >
                    {suffix}
                </Typography>
            )}
        </PaginationTotalSelectedStyled>
    );
}

PaginationTotalSelected.propTypes = {
    /**
     * The display label for the total selected items.
     */
    label: PropTypes.oneOfType([
        PropTypes.shape({
            prefix: PropTypes.node,
            suffix: PropTypes.node,
        }),
        PropTypes.string,
    ]),
    /**
     * The number of total selected items.
     */
    count: PropTypes.number,
};

PaginationTotalSelected.defaultProps = {
    label: '',
    count: 0,
};

export default PaginationTotalSelected;
