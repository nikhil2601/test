import React from 'react';

import Typography from './Typography';

export default {
    title: 'Typography',
    component: Typography,
};

export const basic = () => <Typography type="display1">Basic</Typography>;

export const style = () => (
    <Typography
        light
        style={{
            color: '#848484',
            marginBottom: '15px',
            fontWeight: 400,
        }}
    >
        Styled
    </Typography>
);

export const padding = () => <Typography padding="0 8px">Padding</Typography>;

export const fontSize = () => <Typography fontSize="22px">Font Size</Typography>;

export const fontWeight = () => <Typography fontWeight="bold">Font Weight</Typography>;

export const gutter = () => (
    <Typography gutterBottom="45px" gutterTop="45px" gutterLeft="45px" gutterRight="45px">
        Gutter
    </Typography>
);

export const color = () => <Typography color="#FF0000">Color</Typography>;

export const innerHtml = () => (
    <Typography dangerouslySetInnerHTML={{ __html: '<h1>inner html</h1>' }} />
);
