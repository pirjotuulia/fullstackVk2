import React from 'react';
import Tiedot from './components/Tiedot'
import Hakulomake from './components/Hakulomake'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: '',
      showAll: true
    }
  }

  addName = (event) => {
    event.preventDefault()
    if (!this.state.persons.some(p => p.name === this.state.newName)) {
      const nameObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      const persons = this.state.persons.concat(nameObject)
      this.setState({
        persons, newName: '', newNumber: ''
      })
    } else {
      const persons = this.state.persons
      this.setState({
        persons, newName: '', newNumber: ''
      })
    }
  }

  search = (event) => {
    event.preventDefault()
    if (this.state.filter === '') {
      this.setState({ showAll: true })
    } else {
      this.setState({ showAll: false })
    }
  }

  handleListChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  handleSearchChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const naytettavatNumerot =
      this.state.showAll ?
        this.state.persons :
        this.state.persons.filter(persons => persons.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    const nimirivi = () => naytettavatNumerot.map(person => <Tiedot key={person.name} person={person} />)
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.search}>
          <div>
            <Hakulomake label={'rajaa näytettäviä'} value={this.state.filter} change={this.handleSearchChange} />
          </div>
        </form>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addName}>
          <div>
            <Hakulomake label={'nimi: '} value={this.state.newName} change={this.handleListChange} />
          </div>
          <div>
            <Hakulomake label={'numero: '} value={this.state.newNumber} change={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {nimirivi()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
