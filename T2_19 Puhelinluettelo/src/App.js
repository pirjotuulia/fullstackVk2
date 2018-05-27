import React from 'react';
import Tiedot from './components/Tiedot';
import Hakulomake from './components/Hakulomake';
import dataService from './services/persons';
import Notification from './components/Notification';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      showAll: true,
      remove: '',
      ilmoitus: ''
    }
    console.log('constructor')
  }

  componentDidMount() {
    dataService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  addName = (event) => {
    event.preventDefault()
    if (!this.state.persons.some(p => p.name === this.state.newName)) {
      const nameObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      dataService
        .create(nameObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response),
            newName: '',
            newNumber: '',
            ilmoitus: `${nameObject.name} on lisätty luetteloon.`
          })
          setTimeout(() => {
            this.setState({ ilmoitus: null })
          }, 5000)
        })
    } else {
      const result = window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)
      if (result) {
        const etsittava = this.state.persons.find(p => p.name === this.state.newName)
        const changedObject = {
          name: etsittava.name,
          number: this.state.newNumber
        }
        dataService
          .update(etsittava.id, changedObject)
          .then(changedObject => {
            const persons = this.state.persons.filter(n => n.id !== etsittava.id)
            this.setState({
              persons: persons.concat(changedObject),
              newName: '',
              newNumber: '',
              ilmoitus: `${etsittava.name}: numero on päivitetty.`
            })
            setTimeout(() => {
              this.setState({ ilmoitus: null })
            }, 5000)
          })
          .catch(error => {
            dataService
            .create(changedObject)
            .then(response => {
              this.setState({
                persons: this.state.persons.filter(n => n.id !== etsittava.id).concat(response),
                newName: '',
                newNumber: '',
                ilmoitus: `${changedObject.name} oli poistettu, mutta on nyt lisätty luetteloon uudelleen.`
              })
              setTimeout(() => {
                this.setState({ ilmoitus: null })
              }, 5000)
            })
          })
      } else {
        const persons = this.state.persons
        this.setState({
          persons,
          newName: '',
          newNumber: ''
        })
      }
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

  remove = (person) => {
    dataService
      .remove(person.id)
      .then(response => {
        this.setState({
          persons: this.state.persons.filter(n => n.id !== person.id),
          ilmoitus: `${person.name} on poistettu luettelosta.`
        })
        setTimeout(() => {
          this.setState({ ilmoitus: null })
        }, 5000)
      })
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
  handleRemove = (event, person) => {
    const result = window.confirm(`Poistetaanko ${person.name}?`)
    if (result) {
      this.remove(person)
    }
  }


  render() {
    console.log('render')
    const naytettavatNumerot =
      this.state.showAll ?
        this.state.persons :
        this.state.persons.filter(persons => persons.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    const nimirivi = () => naytettavatNumerot.map(person => <Tiedot key={person.id} person={person} change={this.handleRemove} />)
    const naytetaanIlmoitus =
      this.state.ilmoitus ?
        <Notification message={this.state.ilmoitus} /> : <div></div>
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        {naytetaanIlmoitus}
        {/* <Notification message={this.state.ilmoitus} /> */}
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
