import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { Box, Button, Divider, Typography } from 'lib';
import { genID, isReactComponent } from 'utils';

import SidebarOption from './SidebarOption';
import SidebarPaginator from './SidebarPaginator';
import SidebarDisclaimer from './SidebarDisclaimer';
import SidebarHelpText from './SidebarHelpText';

const SidebarContainer = styled.div`
    position: fixed;
    top: 124px;
    right: 0;
    bottom: 0;
    background: #fff;
    width: 300px;
    /**
     * If we are impersonating a user,
     * we need to bump up the top position
     * to account for the impersonating banner.
     */
    .impersonating & {
        top: 180px;
    }

    @media (max-width: 991px) {
        position: relative;
        width: 100%;
        top: auto;
        bottom: auto;
    }
`;

const SidebarContent = styled(Box)`
    border-left: 1px solid #eaeaea !important;
    bottom: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: absolute;
    right: 0;
    top: 0;

    @media (max-width: 991px) {
        position: relative;
    }
`;

const DividerStyled = styled(Divider)`
    margin: 20px -10px;
    width: calc(100% + 20px);
`;

function Sidebar(props) {
    const {
        buttons,
        checkBox,
        checkboxHelpText,
        handlers,
        options,
        paginator,
        captionContent,
    } = props;

    function renderCheckbox() {
        if (checkBox) {
            return (
                <div key={genID()}>
                    {checkBox}
                    {checkboxHelpText && <SidebarHelpText helpText={checkboxHelpText} />}
                </div>
            );
        }
        return null;
    }

    function renderSidebarButtons() {
        if (buttons) {
            return buttons.map(
                ({ acl = true, onClick, disclaimer, helpText, label, hideDivider, ...btnProps }) =>
                    acl && (
                        <div key={genID()}>
                            <SidebarDisclaimer disclaimer={disclaimer} />
                            {onClick && (
                                <Button {...btnProps} key={genID()} width="100%" onClick={onClick}>
                                    {label}
                                </Button>
                            )}
                            <SidebarHelpText helpText={helpText} />
                            <DividerStyled color="muted" transparent={hideDivider} />
                        </div>
                    )
            );
        }
        return null;
    }
    function renderCaptionContent() {
        if (captionContent) {
            const { captionHeader, color, captionBody, show } = captionContent;
            return (
                show && (
                    <>
                        <Typography color={color}>{captionHeader}</Typography>
                        <DividerStyled color="muted" />
                        <Typography color={color}>{captionBody}</Typography>
                    </>
                )
            );
        }
        return null;
    }

    function renderSidebarPaginator() {
        return paginator && <SidebarPaginator config={paginator} />;
    }

    function renderSidebarOptions() {
        if (options) {
            return (
                <Box borderWidth="0" padding="15px" margin="0">
                    {options.map(option => {
                        const { Component } = option;
                        if (isReactComponent(Component)) {
                            return <Component key={genID()} />;
                        }
                        return <SidebarOption key={genID()} {...option} handlers={handlers} />;
                    })}
                    <DividerStyled color="muted" />
                </Box>
            );
        }
        return null;
    }

    return (
        <SidebarContainer>
            <SidebarContent
                borderRadius="0"
                borderWidth="0"
                elevation={5}
                margin="0"
                padding="30px 30px 10px"
            >
                {renderSidebarOptions()}
                {renderSidebarButtons()}
                {renderCaptionContent()}
                {renderSidebarPaginator()}
                {renderCheckbox()}
            </SidebarContent>
        </SidebarContainer>
    );
}

Sidebar.propTypes = {
    buttons: PropTypes.array,
    checkBox: PropTypes.node,
    checkboxHelpText: PropTypes.string,
    handlers: PropTypes.objectOf(PropTypes.func),
    options: PropTypes.array,
    paginator: PropTypes.array,
    captionContent: PropTypes.object,
};

Sidebar.defaultProps = {
    buttons: null,
    checkBox: null,
    checkboxHelpText: null,
    handlers: null,
    options: null,
    paginator: null,
    captionContent: null,
};

export default Sidebar;
