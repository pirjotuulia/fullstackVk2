import React from 'react'

const Tiedot = ({ person }) => {
    return (
        <tr><td>{person.name}</td><td>{person.number}</td></tr>
    )
}
export default Tiedot