import React, { Component } from 'react';
import { Row, Col, Button, Glyphicon, Form, FormGroup, FormControl } from 'react-bootstrap'

class componentName extends Component {
    render() {
        const { value:{ value, timeValue }, setValue, setTimeUnit, setTimeValue, blockUser } = this.props
        return (
            <Form>
            <FormGroup bsSize="small">
                <Row>
                <Col sm={4}>
                <FormControl 
                    type="text" 
                    placeholder={this.props.placeholder}
                    value={value} 
                    onChange={setValue} />
                </Col>
                <Col sm={3}>
                <FormControl 
                    type="number"
                    placeholder="Duration"
                    value={timeValue} 
                    onChange={setTimeValue}/>
                </Col>
                <Col sm={2}>
                <FormControl onChange={setTimeUnit} componentClass="select">
                    <option value="day">Days</option>
                    <option value="hour">Hours</option>
                    <option value="min">Minutes</option>
                </FormControl>
                </Col>
                <Col sm={3}>
                    <Button bsStyle="primary" style={{width: '100%'}} onClick={blockUser} > 
                        <Glyphicon glyph="glyphicon glyphicon-plus" /> {' '}
                        Block 
                    </Button>
                </Col>
                </Row>
            </FormGroup>
            </Form>
        );
    }
}

export default componentName;