import React from 'react';
import { ThemeProvider } from 'styled-components';

import { THEME } from '../../constants/theme';
import Box from '../Box';
import KeyValuePairs from './KeyValuePairs';
import Typography from '../Typography';
import Switch from '../Switch';

export default {
    title: 'KeyValuePairs',
    component: KeyValuePairs,
};

const items = [
    {
        title: 'title1',
        value: 'value1',
    },
    {
        title: 'title2',
        value: 'value2',
    },
    {
        title: 'title3',
        value: 'value3',
    },
    {
        title: 'title4',
        value: 'value4',
    },
];

export const keyValuePairs = () => (
    <Box>
        <KeyValuePairs items={items} itemKey="title" itemValue="value" keySuffix=" :" />
    </Box>
);

const itemsWithCustomComponent = [
    {
        title: 'title1',
        value: 'value1',
    },
    {
        title: 'title2',
        value: 'value2',
    },
    {
        title: 'title3',
        value: <Switch checked />,
    },
    {
        title: 'title4',
        value: <Typography> Custom Value</Typography>,
    },
];

export const WithCustomValueComponent = () => (
    <ThemeProvider theme={THEME}>
        <Box>
            <KeyValuePairs
                items={itemsWithCustomComponent}
                itemKey="title"
                itemValue="value"
                keySuffix=" :"
            />
        </Box>
    </ThemeProvider>
);
