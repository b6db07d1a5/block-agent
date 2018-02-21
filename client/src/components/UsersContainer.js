import React, { Component } from 'react';
import User from './User'

const time = {
    min: 'min',
    hour: 'hour',
    day: 'day'
}

const user = {
    agent: 'agent',
    ip: 'ip'
}

const selectSource = [
    {id: 'min', name: 'Minutes'},
    {id: 'hour', name: 'Hours'},
    {id: 'day', name: 'Days'}
]

class UsersContainer extends Component {

    state = {
        currentDate: new Date(),
        users: []
    }
    timer = null

    componentDidMount() {
        this.getUserList()
        this.timer = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    getUserList = () => {
        fetch(`/api/users`)
        .then((resp) => resp.json()) 
        .then((data) => {
            if(data.data.length > 0) {
                this.setState({users: data.data})
            }
        })
    }

    saveUserList = () => {
        const url = `/api/users`;
        const { users } = this.state
        let fetchData = { 
            method: 'POST', 
            body: JSON.stringify(users),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, fetchData)
        .then((data) => {
            if(data.status === 200) {
                alert('Save Success')
            }
        });
    }

    tick() {
        const { users, currentDate } = this.state
        let newList = users.map((user) => ({
            ...user,
            isExpire: (new Date(user.expireDate) >= currentDate? false : true)
        }))
        this.setState({
            ...this.state,
            currentDate: new Date(),
            users: newList
        });
    }

    addNewUser = (e) => {
        const {name: userType} = e.target
        let { users: newUsers } = this.state
        newUsers.push({
            id: Math.random().toString(16).substr(2,9),
            userName: '',
            userType: userType,
            timeValue: '',
            timeType: time.min,
            isExpire: false,
            expireDate: new Date(),
            selectSource: selectSource,
        })
        this.setState({
            ...this.state,
            users: newUsers
        })
    }

    deleteUser = (e) => {
        const {id} = e.target
        let { users: newUsers } = this.state
        newUsers = newUsers.filter((user) => user.id !== id)
        this.setState({
            ...this.state,
            users: newUsers
        })
    }

    setUserName = (e) => {
        let { id, value: userName} = e.target
        let { users: newUsers } = this.state
        
        userName = userName.trim()
        
        newUsers = newUsers.map((user)=> (user.id === id? {...user, userName} : user))
        this.setState({
            ...this.state,
            users: newUsers
        })
    }

    setTimeType = (e) => {
        const {id, value: timeType} = e.target
        let { users: newUsers } = this.state
        newUsers = newUsers.map((user)=> (user.id === id? {...user, 
            timeType,
            expireDate: this.setExpireDate(user.timeValue, timeType)} 
            : user))
        this.setState({
            ...this.state,
            users: newUsers
        })
    }

    setTimeValue = (e) => {
        const {id, value: timeValue, name: timeType} = e.target
        let { users: newUsers } = this.state
        newUsers = newUsers.map((user)=> 
            (user.id === id? {...user, 
                timeValue,
                expireDate: this.setExpireDate(timeValue, timeType)} 
                : user))
        this.setState({
            ...this.state,
            users: newUsers
        })
    }

    setExpireDate = (timeValue, timeType) => {
        const { currentDate } = this.state
        timeValue = parseInt(timeValue) || 0

        switch(timeType) {
            case time.min :
                return new Date(new Date().setMinutes(currentDate.getMinutes() + parseInt(timeValue)))
                break;
            case time.hour :
                return new Date(new Date().setHours(currentDate.getHours() + parseInt(timeValue)))
                break;
            case time.day :
                return new Date(new Date().setDate(currentDate.getDate() + parseInt(timeValue)))
                break
            default:
                return new Date()
                break;
        }
    }

    render() {  
        return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <div >
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 30}}> 
                            <span> Block Users </span> 
                            <button style={styles.save} onClick={this.saveUserList}> Save </button> 
                        </div>
                        
                        <p style={styles.header}> Agent List </p>
                        {
                            this.state.users
                                .filter((filter) => filter.userType === user.agent)
                                .map((user) => <User key={user.id} user={user} 
                                                    setUserName={this.setUserName} 
                                                    setTimeType={this.setTimeType} 
                                                    setTimeValue={this.setTimeValue} 
                                                    deleteUser={this.deleteUser} /> )
                        }
                        <button style={styles.add} name={user.agent} onClick={this.addNewUser}> Add User </button>
                    </div>
                    <div>
                        <p style={styles.header}> IP List </p>
                        {
                            this.state.users
                                .filter((filter) => filter.userType === user.ip)
                                .map((user) => <User key={user.id} user={user} 
                                                    setUserName={this.setUserName} 
                                                    setTimeType={this.setTimeType} 
                                                    setTimeValue={this.setTimeValue} 
                                                    deleteUser={this.deleteUser} /> )
                        }
                        <button style={styles.add} name={user.ip} onClick={this.addNewUser}> Add IP </button>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    container :{
        backgroundColor: '#345fa8',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 100
    },
    content: {
        width: '60%',
        backgroundColor: '#fff',
        padding: 20,
    },
    header : {
        marginTop: 40,
        marginBottom: 20
    },
    save: {
        background: '#3498db',
        fontSize: 13,
        color: '#fff',
        borderRadius: 20,
        border: 'none',
        padding: '5px 40px 5px 40px'
    },
    add: {
        background: '#3498db',
        fontSize: 10,
        color: '#fff',
        borderRadius: 20,
        border: 'none',
        padding: '5px 20px 5px 20px',
        marginTop: 10
    },
}

export default UsersContainer;