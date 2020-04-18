import React from 'react';
import { action } from '@storybook/addon-actions';
import ButtonGroup from './ButtonGroup';

export default {
    title: 'ButtonGroup',
    component: ButtonGroup,
};

const actionButtons = [
    {
        color: 'secondary',
        label: 'CANCEL',
        onClick: 'handleCancel',
    },
    {
        color: 'primary',
        label: 'OK',
        onClick: 'handleConfirm',
    },
];

const ToggleButtons = [
    {
        id: 'gridId',
        color: 'secondary',
        label: 'Grid View',
        onClick: 'switchToGridView',
    },
    {
        id: 'listId',
        color: 'primary',
        label: 'List View',
        onClick: 'switchToListView',
    },
];

const toggleButtonHandlers = {
    switchToGridView: action('Grid-button-click'),
    switchToListView: action('List-button-click'),
};

const handlers = {
    handleCancel: action('Cancel-button-click'),
    handleConfirm: action('OK-button-click'),
};

export const buttonGroupWithHandlers = () => (
    <ButtonGroup buttons={actionButtons} handlers={handlers} />
);

export const togglebuttonGroup = () => (
    <ButtonGroup toggle activeId="gridId" buttons={ToggleButtons} handlers={toggleButtonHandlers} />
);

export const buttonGroupWithSpacingProps = () => (
    <ButtonGroup spacing="100px" buttons={actionButtons} handlers={handlers} />
);
