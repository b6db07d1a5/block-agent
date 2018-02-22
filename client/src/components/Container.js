import React, { Component } from 'react';
import axios from 'axios'
import { get } from 'lodash'

import FormAgent from './FormAgent'
import ListAgent from './ListAgent'

const api = 'http://localhost:5000'

const mapTimeUnit = {
    day: 86400,
    hour: 3600,
    min: 60
}

function setUnixDate(timeUnit, timeValue) {
    if(!timeValue) return '';
    return (Date.now() / 1000) + (timeValue * mapTimeUnit[timeUnit])
}

class Container extends Component {

    state = {
        value:'',
        timeUnit: 'day',
        timeValue: '',
        list: []
    }

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
        this.setState({
            value: e.target.value
        })
    }
    setTimeUnit = (e) => {
        this.setState({
            timeUnit: e.target.value
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
        if(!value) return;
        let body = {
            type: type,
            value: value
        }
        if(timeValue) {
            body.expireAt = setUnixDate(timeUnit, timeValue)
        }
        axios.post(`${api}/blocked/`, body)
        .then((response) => {
            let currentList = this.state.list
            currentList.push(response.data.data)
            this.setState({
                list: currentList
            })
        })
        .catch((error) => {
            // console.log(error.response)
            alert(
                get(error, 'response.data.error', error.message)
            )
        });
    }

    deleteUser = (e) => {
        const result = window.confirm("Do you want to delete this user?");
        if (!result) return;

        const { id } = e.target
        axios.delete(`${api}/blocked/${id}`)
            .then((response) => {
                this.setState({
                    list: this.state.list.filter((item) => item.id !== id)
                })
                //alert(`Delete User Agent is ${response.statusText}`)
            })
            .catch(function (error) {
                alert(error.response.data.error)
            });
    }

    render() {
        const title = (this.props.type === 'ip'? 'IP' : 'User Agent')
        return (
            <div>
                <h4> {title} </h4>
                <FormAgent 
                    placeholder={title}
                    value={this.state} 
                    setValue={this.setValue}
                    setTimeUnit={this.setTimeUnit} 
                    setTimeValue={this.setTimeValue}
                    blockUser={this.blockUser} />
                <ListAgent 
                    title={title} 
                    list={this.state.list} 
                    deleteUser={this.deleteUser} />
            </div>
        );
    }
}

export default Container;