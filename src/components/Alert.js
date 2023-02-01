import React from 'react'

function Alert(props) {
    const upCase = (word) => {
        if (word === "danger") {
            word = "error"
        }
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return (
        <div style={{ height: '50px' }}>
            {props.alert &&
                <div >
                    <div className={` alert alert-${props.alert.types} alert-dismissible fade show`} role="alert">
                        <strong> {upCase(props.alert.types)}  </strong> {props.alert.msg}
                    </div>
                </div>}
        </div>
    )
}

export default Alert