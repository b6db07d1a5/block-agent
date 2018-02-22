import React, { Component } from 'react';
import fnsFormat from 'date-fns/format'

class ListAgent extends Component {
    
    render() {
        return (
            <div>
                {this.props.list.map((user, i) => 
                    <div key={user.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p> {user.value} </p>
                        <p> {(user.expireAt? fnsFormat(new Date(user.expireAt), 'DD/MM/YYYY HH:mm:ss') : '' )} </p>
                        <button id={user.id} name={user.type} onClick={this.props.deleteUser}> Delete </button>
                    </div>
                    )}
            </div>
        );
    }
}

export default ListAgent;