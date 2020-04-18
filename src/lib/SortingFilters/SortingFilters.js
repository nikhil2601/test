import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Col, List, ListItem, Row, Typography } from 'lib';
import { ButtonLink } from 'lib/Button';
import { callFunc, getHandler, genID } from 'utils';

const SortingFiltersStyled = styled.div`
    padding-top: 10px;
`;

const ListItemStyled = styled(ListItem)`
    font-size: 12px;
    padding: 4px 20px;
`;

const ButtonLinkStyled = styled(ButtonLink)`
    color: #1577c6;
    font-size: 12px;
    font-weight: 500;
`;

const ButtonLinkItemStyled = styled(ButtonLink)`
    color: #1577c6;
    font-size: 12px;
    font-weight: 500;
    position: absolute;
    left: 5px;
`;

const FiltersItem = styled(Row)`
    border-top: 1px solid #eaeaea;
    padding: 15px 0;
    &:first-of-type {
        margin-top: 10px;
    }
`;

const onClickFilter = (filter, actions) => {
    if (typeof filter.action === 'function') {
        return filter.action(filter);
    }

    const handler = getHandler(actions, 'onLoadFilter');
    return callFunc(handler, filter);
};

const onClickRemove = (option, filter, actions) => {
    const handler = getHandler(actions, 'onRemoveFilter');
    return callFunc(handler, option, filter);
};

const onClearFilters = actions => {
    const handler = getHandler(actions, 'onRemoveAllFilters');
    return callFunc(handler);
};

const renderItem = (option, filter, actions) => {
    return (
        <ListItemStyled key={genID()}>
            <Typography type="caption" gutterBottom="0" gutterTop="0">
                <ButtonLinkItemStyled
                    color="primary"
                    onClick={() => onClickRemove(option, filter, actions)}
                >
                    X
                </ButtonLinkItemStyled>
            </Typography>
            {option.label}
        </ListItemStyled>
    );
};

const SortingFilters = ({ filters, actions }) => {
    return (
        <SortingFiltersStyled>
            <ButtonLinkStyled color="primary" onClick={() => onClearFilters(actions)}>
                X Clear Filters
            </ButtonLinkStyled>
            {filters.length > 0 &&
                filters.map(filter => (
                    <Fragment key={genID()}>
                        <FiltersItem>
                            <Col>
                                <Typography type="caption" gutterBottom="0" gutterTop="0">
                                    {filter.label}
                                </Typography>
                            </Col>
                            <Col>
                                <Typography type="caption" gutterBottom="0" gutterTop="0">
                                    <ButtonLinkStyled
                                        color="primary"
                                        onClick={() => onClickFilter(filter, actions)}
                                    >
                                        + Add
                                    </ButtonLinkStyled>
                                </Typography>
                            </Col>
                        </FiltersItem>
                        <List>
                            {filter.selected.map(option => renderItem(option, filter, actions))}
                        </List>
                    </Fragment>
                ))}
        </SortingFiltersStyled>
    );
};

SortingFilters.propTypes = {
    filters: PropTypes.array,
    actions: PropTypes.object,
};

SortingFilters.defaultProps = {
    filters: [],
    actions: {},
};

export default SortingFilters;
