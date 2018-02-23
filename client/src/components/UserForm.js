import React, { Component } from 'react';
import Sticky from 'react-stickynode'
import styled from 'styled-components';
import { Row, Col, Button, InputGroup, MenuItem, DropdownButton, Glyphicon, Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'

const WrapForm = styled.div`
& {
    .sticky-outer-wrapper {
        height: 100px !important;
    }
    .sticky-inner-wrapper {
        background-color: #fff
    }
}
`;

class UserForm extends Component {
    render() {
        const { value:{ value, timeValue, timeUnit }, setValue, setTimeUnit, setTimeValue, blockUser, error } = this.props
        return (
            <WrapForm>
                <Sticky innerZ={1}>
                    <h4> {this.props.title} </h4>
                    <Form>
                        <FormGroup bsSize="small">
                            <Row>
                                <Col sm={5}>
                                    <FormGroup validationState={error.value ? 'error' : null}>
                                        <FormControl 
                                            type="text" 
                                            placeholder={this.props.title}
                                            value={value} 
                                            onChange={setValue} />
                                        {error.value && <HelpBlock>{error.message}</HelpBlock>}
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                type="number"
                                                placeholder="Duration"
                                                value={timeValue} 
                                                onChange={setTimeValue}/>
                                            <DropdownButton
                                                componentClass={InputGroup.Button}
                                                onSelect={setTimeUnit}
                                                id="input-dropdown-addon"
                                                title={timeUnit}
                                                bsSize="small" >
                                                    <MenuItem value="day">day</MenuItem>
                                                    <MenuItem value="hour">hour</MenuItem>
                                                    <MenuItem value="min">min</MenuItem>
                                            </DropdownButton>
                                        </InputGroup>
                                    </FormGroup>
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
                </Sticky>
            </WrapForm>
        );
    }
}

export default UserForm;