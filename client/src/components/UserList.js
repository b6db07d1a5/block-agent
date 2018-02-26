import React from 'react';
import fnsFormat from 'date-fns/format'
import { Table, Button, Label, Glyphicon } from 'react-bootstrap'

const UserList = (props) => {

    const {
        title, 
        list, 
        deleteUser
    } = props
    
    return (
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>{title}</th>
                    <th>Start Date</th>
                    <th>Expire Date</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {list.map((user, i) => 
                    <tr key={user.id}>
                        <td> {user.value} </td>
                        <td> {fnsFormat(new Date(user.startDate), 'DD/MM/YYYY HH:mm:ss')} </td>
                        <td> 
                            <div>
                                {(user.expireAt && fnsFormat(new Date(user.expireAt), 'DD/MM/YYYY HH:mm:ss') )} {' '}
                                {(user.isExpire && <Label bsStyle="warning">Expired</Label> )}
                            </div>
                        </td>
                        <td> 
                            <center>
                                <Button bsSize='xsmall' 
                                        bsStyle="danger" 
                                        name={user.type} 
                                        onClick={deleteUser(user.id)}> 
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
};

export default UserList;