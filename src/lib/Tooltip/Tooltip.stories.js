import React from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';
import Button from '../Button';
import Typography from '../Typography';
import Link from '../Link';

const TooltipContentWrapper = styled.div`
    width: 100px;
`;

export default {
    title: 'Tooltip',
    component: Tooltip,
};

export const buttonTooltip = () => (
    <Tooltip content="Click Button" padding="5px" placement="bottom">
        <Button>Button</Button>
    </Tooltip>
);

export const placementTooltip = () => (
    <Tooltip content="Click Button" placement="right">
        <Button>Button</Button>
    </Tooltip>
);

export const textTooltip = () => (
    <Tooltip content="Text tooltip content" padding="5px" placement="bottom" leaveDelay={5}>
        <TooltipContentWrapper>
            <Typography>Text Tooltip</Typography>
        </TooltipContentWrapper>
    </Tooltip>
);

export const linkTooltip = () => (
    <Tooltip content="Click Link">
        <TooltipContentWrapper>
            <Link color="blue" onClick={() => {}}>
                Link Tooltip
            </Link>
        </TooltipContentWrapper>
    </Tooltip>
);
