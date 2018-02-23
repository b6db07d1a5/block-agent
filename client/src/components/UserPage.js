import React, { Component } from 'react';
import UserContent from './UserContent'
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
class UserPage extends Component {
    render() {
        return (
                <Grid>
                    <PageHeader>
                        <small>Block User List </small>
                    </PageHeader>
                    <Row>
                        <Col md={6} xs={12} >
                            <UserContent type='userAgent' />
                        </Col>
                        <Col md={6} xs={12}>
                            <UserContent type='ip' />
                        </Col>
                    </Row>
                </Grid>
            );
    }
}

export default UserPage;