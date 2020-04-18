import React from 'react';
import { compose } from 'recompose';

import { Col, Container, Divider, Row, Typography } from 'pep-comp';


function Home() {
    return (
        <Container margin="50px auto">
            <Row>
                <Col size={8}>
                    <Typography gutterBottom="15px" type="title">
                        Demo
                    </Typography>
                    <Divider margin="0 0 20px" />
                </Col>
                <Col size={4} />
            </Row>
            <Row>
                <Col size={8}>
                    Demo
                </Col>
                <Col size={4}>
                    Demo
                </Col>
            </Row>
        </Container>
    );
}

export default compose(Home);
