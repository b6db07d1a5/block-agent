import React, { Component } from 'react';
import axios from 'axios'
import { get } from 'lodash'
import UserForm from './UserForm'
import UserList from './UserList'

const api = 'http://localhost:5000'

const mapTimeUnit = {
    day: 86400,
    hour: 3600,
    min: 60
}

const defaultState = {
    value:'',
    timeUnit: 'day',
    timeValue: '',
    isAlert: {
        value: false,
        message: null
    },
    list: []
}

function setUnixDate(timeUnit, timeValue) {
    if(!timeValue) return '';
    return (Date.now() / 1000) + (timeValue * mapTimeUnit[timeUnit])
}

export default class UserContainer extends Component {

    state = defaultState

    componentDidMount() {
        axios.get(`${api}/blocked/${this.props.type}`)
            .then((response) => {
                this.setState({
                    list: response.data.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setValue = (e) => {
        const { value } = e.target
        this.setState({
            value: value,
            isAlert: (value? { value: false,} :
                    {
                        value: true,
                        message: 'Please insert user value.'
                    })
        })
    }

    setTimeUnit = (event, eventValue) => {
        this.setState({
            timeUnit: eventValue.target.text
        })
    }

    setTimeValue = (e) => {
        this.setState({
            timeValue: e.target.value
        })
    }
    
    blockUser = (e) => {
        const { value, timeUnit, timeValue } = this.state
        const { type } = this.props
        if(!value) {
            this.setState({isAlert: {value: true, message: 'Please insert user value.'}}) 
            return;
        }
        let body = {
            type: type,
            value: value
        }
        if(timeValue) {
            body.expireAt = setUnixDate(timeUnit, timeValue)
        }
        axios.post(`${api}/blocked/`, body)
        .then((response) => {
            this.setState({
                ...defaultState,
                list: [response.data.data].concat(this.state.list)
            })
        })
        .catch((error) => {
            this.setState({
                isAlert: {
                    value: true,
                    message: get(error, 'response.data.error', error.message)
                }
            })
        });
    }

    deleteUser = (id) => () => {
        const result = window.confirm("Do you want to delete this user?");
        if (!result) return;

        axios.delete(`${api}/blocked/${id}`)
            .then((response) => {
                this.setState({
                    list: this.state.list.filter((item) => item.id !== id)
                })
            })
            .catch(function (error) {
                console.log('error', error)
                alert(error.response.data.error)
            });
    }

    render() {
        const title = (this.props.type === 'ip'? 'IP' : 'User Agent')
        return (
            <div>
                <UserForm 
                    title={title}
                    value={this.state} 
                    setValue={this.setValue}
                    setTimeUnit={this.setTimeUnit} 
                    setTimeValue={this.setTimeValue}
                    blockUser={this.blockUser}
                    error={this.state.isAlert}
                />
                <UserList 
                    title={title} 
                    list={this.state.list} 
                    deleteUser={this.deleteUser} 
                />
            </div>
        );
    }
}