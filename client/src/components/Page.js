import React, { Component } from 'react';
import Container from './Container'
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
class Page extends Component {
    render() {
        return (
                <Grid>
                    <PageHeader>
                        Block User List 
                    </PageHeader>
                    <Row>
                        <Col xs={6} >
                            <Container type='userAgent' />
                        </Col>
                        <Col xs={6} >
                            <Container type='ip' />
                        </Col>
                    </Row>
                </Grid>
        );
    }
}

export default Page;