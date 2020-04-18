import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

import FaIcon from 'lib/FaIcon';
import Row from 'lib/Row';
import { calculateLastPage } from 'utils/pagination';
import { getThemeProps } from 'utils/theme';

import PaginationActionsButton from './PaginationActionsButton';
import PaginationActionsButtonContainer from './PaginationActionsButtonContainer';
import PaginationActionsCurrentPage from './PaginationActionsCurrentPage';
import PaginationActionsLastPage from './PaginationActionsLastPage';
import PaginationActionsOf from './PaginationActionsOf';

const PaginationActionsStyled = styled(Row)`
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('PaginationActions.styles')};
`;

class PaginationActions extends React.Component {
    static propTypes = {
        /**
         * The idx of the current page.
         */
        currentPage: PropTypes.number.isRequired,
        /**
         * Action taken upon each page change.
         */
        onChangePage: PropTypes.func,
        /**
         * The amount of rows per page.
         */
        rowsPerPage: PropTypes.number.isRequired,
        /**
         * The total rows available.
         */
        totalRows: PropTypes.number.isRequired,
    };

    static defaultProps = {
        onChangePage: () => {},
    };

    constructor(props) {
        super(props);
        // Extract some props.
        const { currentPage = 1, rowsPerPage, totalRows } = props;
        // Build the initial state based on passed in props.
        this.state = {
            // Calc the last page from props if possible.
            lastPage: calculateLastPage(totalRows, rowsPerPage),
            // Navigate the user to the initial page value.
            pageInputValue: currentPage,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentPage, rowsPerPage, totalRows } = this.props;
        const {
            currentPage: prevCurrentPage,
            rowsPerPage: prevRowsPerPage,
            totalRows: prevTotalRows,
        } = prevProps;

        if (
            currentPage !== prevCurrentPage ||
            rowsPerPage !== prevRowsPerPage ||
            totalRows !== prevTotalRows
        ) {
            // NOTE: It's completely alright to update state in 'componentDidUpdate'
            // as long as it is inside a condition.
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(() => ({
                lastPage: calculateLastPage(totalRows, rowsPerPage),
                pageInputValue: currentPage,
            }));
        }
    }

    handleFirstPageClick = event => {
        const { onChangePage } = this.props;

        onChangePage(event, 1);
    };

    handleBackClick = event => {
        const { currentPage, onChangePage } = this.props;

        onChangePage(event, currentPage - 1);
    };

    handleForwardClick = event => {
        const { currentPage, onChangePage } = this.props;

        onChangePage(event, currentPage + 1);
    };

    handleLastPageClick = event => {
        const { lastPage } = this.state;
        const { onChangePage } = this.props;

        onChangePage(event, lastPage);
    };

    handleInputChange = event => {
        const { pageInputValue } = this.state;
        const value = event.target.value;

        pageInputValue !== value && this.setState(() => ({ pageInputValue: value }));
    };

    handleInputOnKeyPress = event => {
        if (event.charCode === 13) {
            const { lastPage, pageInputValue } = this.state;
            const { currentPage, onChangePage } = this.props;
            let value = parseInt(pageInputValue, 10) || lastPage;

            if (value >= lastPage) {
                value = lastPage;
            }

            if (value < 1) {
                value = 1;
            }

            if (currentPage !== value) {
                onChangePage(event, value);
            }

            this.setState(() => ({ pageInputValue: value }));
        }
    };

    render() {
        const { lastPage, pageInputValue } = this.state;
        const { totalRows, currentPage, rowsPerPage } = this.props;

        // To stay consistent with the current implementation,
        // we will hide the pagination actions if the last page
        // is less than or equal to `1`.
        if (lastPage <= 1) {
            return null;
        }

        return (
            <React.Fragment>
                <PaginationActionsStyled
                    alignItems="center"
                    display={{ xs: 'flex', lg: 'none' }}
                    gutter={false}
                    height="100%"
                    justify="space-between"
                    wrap="nowrap"
                >
                    <PaginationActionsButton
                        border
                        color="paginationButton"
                        disabled={currentPage === 1}
                        onClick={this.handleBackClick}
                        margin="0 10px 0 0"
                    >
                        <FaIcon icon={faAngleLeft} height="15px" width="15px" />
                    </PaginationActionsButton>
                    <PaginationActionsLastPage>{currentPage}</PaginationActionsLastPage>
                    <PaginationActionsOf>of</PaginationActionsOf>
                    <PaginationActionsLastPage>{lastPage}</PaginationActionsLastPage>
                    <PaginationActionsButton
                        border
                        color="paginationButton"
                        disabled={currentPage >= Math.ceil(totalRows / rowsPerPage)}
                        onClick={this.handleForwardClick}
                    >
                        <FaIcon icon={faAngleRight} height="15px" width="15px" />
                    </PaginationActionsButton>
                </PaginationActionsStyled>
                <PaginationActionsStyled
                    alignItems="center"
                    display={{ xs: 'none', lg: 'flex' }}
                    gutter={false}
                    height="100%"
                    justify="space-between"
                    wrap="nowrap"
                >
                    <PaginationActionsButtonContainer>
                        <PaginationActionsButton
                            border
                            color="paginationButton"
                            disabled={currentPage === 1}
                            onClick={this.handleFirstPageClick}
                        >
                            <FaIcon icon={faAngleDoubleLeft} height="15px" width="15px" />
                        </PaginationActionsButton>
                        <PaginationActionsButton
                            border
                            color="paginationButton"
                            disabled={currentPage === 1}
                            onClick={this.handleBackClick}
                        >
                            <FaIcon icon={faAngleLeft} height="15px" width="15px" />
                        </PaginationActionsButton>
                    </PaginationActionsButtonContainer>
                    <PaginationActionsCurrentPage
                        onKeyPress={this.handleInputOnKeyPress}
                        onChange={this.handleInputChange}
                        type="text"
                        value={pageInputValue}
                    />
                    <PaginationActionsOf>of</PaginationActionsOf>
                    <PaginationActionsLastPage>{lastPage}</PaginationActionsLastPage>
                    <PaginationActionsButtonContainer>
                        <PaginationActionsButton
                            border
                            color="paginationButton"
                            disabled={currentPage >= Math.ceil(totalRows / rowsPerPage)}
                            onClick={this.handleForwardClick}
                        >
                            <FaIcon icon={faAngleRight} height="15px" width="15px" />
                        </PaginationActionsButton>
                        <PaginationActionsButton
                            border
                            color="paginationButton"
                            disabled={currentPage >= Math.ceil(totalRows / rowsPerPage)}
                            onClick={this.handleLastPageClick}
                        >
                            <FaIcon icon={faAngleDoubleRight} height="15px" width="15px" />
                        </PaginationActionsButton>
                    </PaginationActionsButtonContainer>
                </PaginationActionsStyled>
            </React.Fragment>
        );
    }
}

export default PaginationActions;
