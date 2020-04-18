import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Row from 'lib/Row';
import Select from 'lib/Select';
import Typography from 'lib/Typography';
import { themeGet } from 'utils/theme';

const PaginationRowsPerPageStyled = styled(Row)`
    z-index: 500;
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('PaginationRowsPerPage.styles')};
`;

function PaginationRowsPerPage(props) {
    const { label, onChange, rowsPerPage, rowsPerPageOptions } = props;
    // Build the options list for the Select Component.
    const options = rowsPerPageOptions.map(option => ({ label: option, value: option }));
    // Build the current default value.
    const value = {
        label: rowsPerPage,
        value: rowsPerPage,
    };
    // Render the Pagination RowsPerPage.
    return (
        <PaginationRowsPerPageStyled
            alignItems="center"
            gutter={false}
            justify="flex-start"
            width="auto"
            wrap="nowrap"
        >
            {label && (
                <Typography
                    color="text"
                    gutterBottom="0"
                    gutterRight="10px"
                    gutterTop="0"
                    type="paginationLabel"
                >
                    {label}
                </Typography>
            )}
            <Select
                defaultValue={value}
                isClearable={false}
                isSearchable={false}
                minWidth="80px"
                name="pagination-rows-per-page"
                onChange={onChange}
                options={options}
                value={value}
            />
        </PaginationRowsPerPageStyled>
    );
}

PaginationRowsPerPage.propTypes = {
    /**
     * Rows per page Label.
     */
    label: PropTypes.string,
    /**
     * `onChange` handler for the select-dropdown.
     */
    onChange: PropTypes.func,
    /**
     * The current number of `rowsPerPage`.
     */
    rowsPerPage: PropTypes.number,
    /**
     * A list of options for the `rowsPerPage` select-dropdown.
     */
    rowsPerPageOptions: PropTypes.array,
};

PaginationRowsPerPage.defaultProps = {
    label: '',
    onChange: () => {},
    rowsPerPage: 10,
    rowsPerPageOptions: [20, 10, 5],
};

export default PaginationRowsPerPage;
