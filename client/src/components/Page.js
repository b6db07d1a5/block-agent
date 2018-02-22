import React, { Component } from 'react';
import Container from './Container'

class Page extends Component {
    render() {
        return (
            <div style={{display: 'flex'}}>
                <Container type='userAgent' />
                <Container type='ip' />
            </div>
        );
    }
}

export default Page;