import React from 'react'

const Tiedot = ({ person, change }) => {
    return (
        <tr><td>{person.name}</td><td>{person.number}</td><td><button onClick={(e)=> change(e, person)}>poista</button></td></tr>
    )
}
export default Tiedot