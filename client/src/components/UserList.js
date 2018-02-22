import React, { Component } from 'react';
import axios from 'axios'
import fnsFormat from 'date-fns/format'

class UserList extends Component {
    render() {
        return (
            <div>
                {this.props.userAgents.map(user => 
                    <div key={user.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p> {user.value} </p>
                        <p> {(user.expireAt? fnsFormat(new Date(user.expireAt), 'DD/MM/YYYY HH:mm:ss') : '' )} </p>
                        <button id={user.id} name={user.type} onClick={this.props.deleteUserAgent}> Delete </button>
                    </div>
                    )}
            </div>
        );
    }
}

export default UserList;