import React from 'react';
import { actions } from '@storybook/addon-actions';

import Iframe from './Iframe';
import Box from '../Box';

export default {
    title: 'Iframe',
    component: Iframe,
};

const handler = actions('onLoad');

const url = '';

export const simpleIframe = () => <Iframe {...handler} title="Simple Iframe" src={url} />;

export const customIframe = () => (
    <Box width="80%" height="400px">
        <Iframe
            {...handler}
            width="80%"
            height="80%"
            margin="10px"
            border="1px solid"
            padding="1px"
            title="Simple Iframe"
            src={url}
        />
    </Box>
);
