import React, { Component } from 'react';

class InputForm extends Component {
    render() {
        const { type, value, timeValue, setValue, changeTimeUnit, block } = this.props
        return (
            <div>
                <input 
                    type="text" 
                    name={type}
                    value={value} 
                    onChange={setValue}/>
                <input 
                    type="number"
                    name={type}
                    value={timeValue} 
                    onChange={setValue}/>
                <select 
                    name={type}
                    onChange={changeTimeUnit}>
                    <option value="day">Days</option>
                    <option value="hour">Hours</option>
                    <option value="min">Minutes</option>
                </select>
                    <button name={type} onClick={block} > Block </button>
            </div>
        );
    }
}

export default InputForm;