import React from 'react';
import UserContainer from './UserContainer'
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

const UserPage = () => {
    return (
        <Grid>
            <PageHeader>
                <small>Block User List </small>
            </PageHeader>
            <Row>
                <Col md={6} xs={12} >
                    <UserContainer type='userAgent' />
                </Col>
                <Col md={6} xs={12}>
                    <UserContainer type='ip' />
                </Col>
            </Row>
        </Grid>
    );
};

export default UserPage;