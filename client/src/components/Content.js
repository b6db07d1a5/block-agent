import React, { Component } from 'react';
import axios from 'axios'
import InputForm from './InputForm';
import UserList from './UserList';

const mapTimeUnit = {
    day: 86400,
    hour: 3600,
    min: 60
}

const defaultState = {
    userAgent: {
        value: '',
        timeUnit: 'day',
        timeValue: '',
        expireAt: ''
    },
    ip: {
        value: '',
        timeUnit: 'day',
        timeValue: '',
        expireAt: ''
    },
    userAgentList: [],
    userIpList: []
}

function setUnixDate(timeUnit, timeValue) {
    if(!timeValue) return '';
    return (Date.now() / 1000) + (timeValue * mapTimeUnit[timeUnit])
}

class Content extends Component {

    state = defaultState

    componentDidMount() {
        this.fetchUserAgent()
    }

    setValue = (e) => {
        const { name: type, value, type: inputType } = e.target
        const currentTypeData = this.state[type]
        const valueType = (inputType === 'text'? 'value': 'timeValue')
        this.setState({
            [type]: {
                ...currentTypeData,
                [valueType]: value,
                expireAt: (valueType === 'timeValue'? setUnixDate(currentTypeData.timeUnit, value) :'')
            }
        })
    }

    changeTimeUnit = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: {
                ...this.state[name],
                timeUnit: value
            }
        })
    }

    blockUserAgent = (e) => {
        const typeAgent = e.target.name
        const { value, timeValue, expireAt } = this.state[typeAgent]

        if(!value){
            return;
        }

        let body = {
            type: typeAgent,
            value: value,
        }
        if(expireAt) {
            body.expireAt = expireAt
        }
        axios.post(`/blocked/`, body)
            .then((response) => {
                const stateField = typeAgent === 'userAgent'
                    ? 'userAgentList'
                    : 'userIpList'
                
                
            })
            .catch((error) => {
                alert(error.response.data.error)
            });
    }

    deleteUserAgent = (e) => {
        const { id, name: typeAgent } = e.target
        axios.delete(`/blocked/${id}`)
            .then((response) => {
                const stateField = typeAgent === 'userAgent'
                    ? 'userAgentList'
                    : 'userIpList'

                this.setState({
                    [stateField]: this.state[stateField].filter(item => item.id !== id)
                })
                alert(`Delete User Agent is ${response.statusText}`)
            })
            .catch(function (error) {
                alert(error.response.data.error)
            });
    }

    fetchUserAgent = () => {
        Promise.all([
            axios.get(`/blocked/ip`),
            axios.get(`/blocked/userAgent`)
        ])
        .then(([ipResult, agentResult]) => {
            this.setState({
                userIpList: ipResult.data.data,
                userAgentList: agentResult.data.data
            })
        })
    }

    render() {
        const { value, timeValue, timeUnit } = this.state.userAgent
        const { value: valueIp, timeValue: timeValueIp, timeUnit: timeUnitIp} = this.state.ip
        return (
            <div style={{display: 'flex'}}>
                <div>
                <InputForm 
                    type='userAgent' 
                    value={value} 
                    timeValue={timeValue} 
                    setValue={this.setValue}
                    changeTimeUnit={this.changeTimeUnit}
                    block={this.blockUserAgent} />

                    <UserList type='userAgent' userAgents={this.state.userAgentList} deleteUserAgent={this.deleteUserAgent} />
                </div>

                <div>
                <InputForm 
                    type='ip' 
                    value={valueIp} 
                    timeValue={timeValueIp} 
                    setValue={this.setValue}
                    changeTimeUnit={this.changeTimeUnit}
                    block={this.blockUserAgent} />

                    <UserList type='ip' userAgents={this.state.userIpList} deleteUserAgent={this.deleteUserAgent} />
                </div>
            </div>
        );
    }
}



export default Content;