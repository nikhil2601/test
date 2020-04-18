import React from 'react';

import Toolbar from './Toolbar';
import Row from '../Row';
import Col from '../Col';

export default {
    title: 'Toolbar',
    component: Toolbar,
};

export const toolbar = () => (
    <Toolbar margin="0">
        <Row>
            <Col>Toolbar content</Col>
        </Row>
    </Toolbar>
);

export const toolbarElevation = () => (
    <Toolbar elevation="4" width="50%">
        <Row>
            <Col>Toolbar content</Col>
        </Row>
    </Toolbar>
);
