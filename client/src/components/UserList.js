import React, { Component } from 'react';
import fnsFormat from 'date-fns/format'
import { Table, Button, Label, Glyphicon } from 'react-bootstrap'

class UserList extends Component {
    
    render() {
        return (
            <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>{this.props.title}</th>
                    <th>Expire Date</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {this.props.list.map((user, i) => 
                    <tr key={user.id}>
                        <td> {user.value} </td>
                        <td> 
                            <div>
                                { (user.expireAt && fnsFormat(new Date(user.expireAt), 'DD/MM/YYYY HH:mm:ss') )} {' '}
                                {(user.isExpire && <Label bsStyle="warning">Expired</Label> )}
                            </div>
                        </td>
                        <td> 
                            <center>
                                <Button bsSize='xsmall' bsStyle="danger" name={user.type} onClick={this.props.deleteUser(user.id)}> 
                                    <Glyphicon glyph="glyphicon glyphicon-trash" /> {' '}
                                    Delete 
                                </Button>
                            </center>
                        </td>
                    </tr>
                    )}
            </tbody>
                
            </Table>
        );
    }
}

export default UserList;