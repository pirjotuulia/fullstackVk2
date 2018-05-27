import React from 'react'

const Hakulomake = ({ label, value, change }) => {
    return (
        <div>
            {label} <input value={value} onChange={change} />
        </div>
    )
}

export default Hakulomake