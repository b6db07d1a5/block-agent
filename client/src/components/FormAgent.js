import React, { Component } from 'react';

class componentName extends Component {
    render() {
        const { value:{ value, timeValue }, setValue, setTimeUnit, setTimeValue, blockUser } = this.props
        return (
            <div>
                <input 
                    type="text" 
                    value={value} 
                    onChange={setValue}/>
                <input 
                    type="number"
                    value={timeValue} 
                    onChange={setTimeValue}/>
                <select onChange={setTimeUnit}>
                    <option value="day">Days</option>
                    <option value="hour">Hours</option>
                    <option value="min">Minutes</option>
                </select>
                    <button onClick={blockUser} > Block </button>
            </div>
        );
    }
}

export default componentName;