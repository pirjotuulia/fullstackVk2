import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>
    )
}

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1> {props.kurssi.nimi}</h1>
const Sisalto = (props) => {
    const osat = props.kurssi.osat
    const rivit = () => osat.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)
    return (
        <div>
            <ul>
                {rivit()}
            </ul>
        </div>
    )
}

const Yhteensa = (props) => {
    const osat = props.kurssi.osat
    const yhteensa = osat.reduce((sum, osa) => sum + osa.tehtavia, 0)
    return (
        <p>yhteensä {yhteensa} tehtävää</p>
    )
}

export default Kurssi