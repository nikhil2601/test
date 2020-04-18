import PropTypes from 'prop-types';
import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import Col from 'lib/Col';
import Row from 'lib/Row';
import { calculateLastPage } from 'utils/pagination';
import { getThemeProps } from 'utils/theme';
import { get } from 'utils/lodash';

import PaginationActions from './PaginationActions';
import PaginationRowsPerPage from './PaginationRowsPerPage';
import PaginationTotalRows from './PaginationTotalRows';
import PaginationTotalSelected from './PaginationTotalSelected';

const PaginationStyled = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0;
    @media (min-width: 641px) {
        align-items: center;
        flex-direction: row;
    }
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('Pagination.styles')};
`;

class Pagination extends React.Component {
    static propTypes = {
        /**
         * Index of the current page
         */
        currentPage: PropTypes.number,
        // Prop to hide pagination
        hidePagination: PropTypes.bool,
        /**
         * The number of rows per page
         */
        rowsPerPage: PropTypes.number,
        /**
         * The display label for the rows per page
         */
        rowsPerPageLabel: PropTypes.node,
        /**
         * The options of the rows per page selection field
         */
        rowsPerPageOptions: PropTypes.array,
        /**
         * Define and overwrite the CSS styles.
         */
        style: PropTypes.object,
        /**
         * The total number of rows
         */
        totalRows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /**
         * The display label for the total rows
         */
        totalRowsLabel: PropTypes.oneOfType([
            PropTypes.shape({
                prefix: PropTypes.node,
                suffix: PropTypes.node,
            }),
            PropTypes.string,
        ]),
        /**
         * Event fired upon a successful page change
         */
        onChangePage: PropTypes.func,
        /**
         * Event fired upon a successful rows per page change
         */
        onChangeRowsPerPage: PropTypes.func,
        /**
         * Props for the selected items count.
         */
        selected: PropTypes.object,
    };

    static defaultProps = {
        currentPage: 0,
        hidePagination: false,
        onChangePage: () => {},
        onChangeRowsPerPage: () => {},
        rowsPerPage: 10,
        rowsPerPageLabel: 'Rows per page:',
        rowsPerPageOptions: [5, 10, 15, 20],
        selected: {},
        style: null,
        totalRows: 0,
        totalRowsLabel: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const { totalRows, onChangePage, currentPage, rowsPerPage } = this.props;
        // Calculate the last page of the pagination.
        const lastPage = calculateLastPage(totalRows, rowsPerPage);
        // If the current page is greater than the last page,
        // then we will throw the onChangePage event.
        if (currentPage > lastPage) {
            onChangePage(null, lastPage);
        }
    }

    onRowsChange = ({ value }) => {
        const { onChangeRowsPerPage } = this.props;
        onChangeRowsPerPage({ value: parseInt(value, 10) });
    };

    render() {
        const {
            currentPage,
            hidePagination,
            onChangePage,
            rowsPerPage,
            rowsPerPageLabel,
            rowsPerPageOptions,
            style,
            selected,
            totalRows,
            totalRowsLabel,
        } = this.props;
        // Determine the selected count.
        const selectedCount = selected ? get(selected, 'itemCount', 0) : null;
        const isSelectedCountPresent = typeof selectedCount === 'number';

        return (
            <PaginationStyled style={style}>
                <Row alignItems="center" gutter={false} width="100%">
                    <Col gutter={false}>
                        <Row
                            direction={isSelectedCountPresent ? 'column' : null}
                            gutter={false}
                            height="100%"
                            justify="flex-start"
                        >
                            {!_isEmpty(totalRowsLabel) && (
                                <PaginationTotalRows label={totalRowsLabel} totalRows={totalRows} />
                            )}
                            {isSelectedCountPresent && (
                                <PaginationTotalSelected count={selectedCount} {...selected} />
                            )}
                        </Row>
                    </Col>
                    <Col gutter={false}>
                        <Row
                            alignItems="center"
                            gutter={false}
                            height="100%"
                            justify={{ xs: 'flex-end', md: 'center' }}
                        >
                            <PaginationActions
                                currentPage={currentPage}
                                onChangePage={onChangePage}
                                rowsPerPage={rowsPerPage}
                                totalRows={totalRows}
                            />
                        </Row>
                    </Col>
                    <Col display={{ xs: 'none', md: 'block' }} gutter={false}>
                        <Row alignItems="center" justify="flex-end" gutter={false}>
                            {!hidePagination && (
                                <PaginationRowsPerPage
                                    label={rowsPerPageLabel}
                                    onChange={this.onRowsChange}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOptions={rowsPerPageOptions}
                                />
                            )}
                        </Row>
                    </Col>
                </Row>
            </PaginationStyled>
        );
    }
}

export default Pagination;
