import React from 'react';

const User = ({user, setUserName, setTimeType, setTimeValue, deleteUser}) => {
    const { id, userName, expireDate, isExpire, timeType, timeValue, selectSource } = user
    return (
        <div style={styles}>
            <input style={styles.name}
                    name="text" 
                    id={id}
                    type="text" 
                    value={userName} 
                    onChange={setUserName}/>
            <select style={styles.timeType}
                    id={id} 
                    value={timeType} 
                    onChange={setTimeType} >
                {selectSource.map((source) => <option key={source.id} value={source.id}>{source.name}</option>)}
            </select>
            <input style={styles.timeValue}
                    id={id}
                    name={timeType}
                    type="number"
                    value={timeValue} 
                    onChange={setTimeValue}/>
            <button style={styles.delete}
                id={id} 
                onClick={deleteUser} > Delete </button>
            <span style={style(isExpire)}> 
                {new Date(expireDate).toLocaleTimeString('en-GB').slice(0,-3)} - {new Date(expireDate).toLocaleDateString('en-GB')}
                {(isExpire? " Expired": null )}
            </span>
        </div>
    );
};

const style = (isExpire) => {
    return (isExpire? ({color: 'red'}): ({color: 'black'}))
}

const styles = {
    padding: 2,
    name : {
        width: 200, marginRight: 10
    },
    timeType: {
        marginRight: 5
    },
    timeValue: {
        width: 50, marginRight: 5
    },
    delete: {
        marginRight: 20,
        background: '#ef8656',
        color: '#fff',
        borderRadius: 2,
        border: 'none',
    }
}
export default User;