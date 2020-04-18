import PropTypes from 'prop-types';
import React from 'react';
import { Button, Divider, genID } from 'pep-comp';
import styled from 'styled-components';

const SidebarPaginatorWrapper = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 10px 0 15px 0;
    width: 240px;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

function SidebarPaginator(props) {
    const { config } = props;
    return (
        <SidebarPaginatorWrapper>
            <Divider color="muted" />
            <ButtonsWrapper>
                {config.map(conf => (
                    <Button
                        key={genID()}
                        width="110px"
                        style={{ minWidth: '110px' }}
                        color={conf.color}
                    >
                        {conf.text}
                    </Button>
                ))}
            </ButtonsWrapper>
        </SidebarPaginatorWrapper>
    );
}

SidebarPaginator.propTypes = {
    config: PropTypes.array,
};

SidebarPaginator.defaultProps = {
    config: [],
};

export default SidebarPaginator;
