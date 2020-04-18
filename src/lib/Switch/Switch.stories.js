import React from 'react';
import { ThemeProvider } from 'styled-components';
import { actions } from '@storybook/addon-actions';

import Switch from './Switch';
import { THEME } from '../../constants';

export default {
    title: 'Switch',
    component: Switch,
};

const handler = actions('onClick');

export const simpleSwitch = () => (
    <ThemeProvider theme={THEME}>
        <Switch {...handler} activeBarColor="error" />
    </ThemeProvider>
);

export const switchDisabled = () => (
    <ThemeProvider theme={THEME}>
        <Switch {...handler} isDisabled />
    </ThemeProvider>
);

export const switchCheck = () => (
    <ThemeProvider theme={THEME}>
        <Switch {...handler} checked />
    </ThemeProvider>
);

export const switchCheckDisabled = () => (
    <ThemeProvider theme={THEME}>
        <Switch {...handler} checked isDisabled />
    </ThemeProvider>
);
