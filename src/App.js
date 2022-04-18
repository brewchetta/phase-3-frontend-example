import { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [people, setPeople] = useState([])
  const [formState, setFormState] = useState({
    name: '',
    age: 0,
    "alive?": false,
    pain: 0,
    location: ''
  })

  useEffect(() => {
    fetch('http://localhost:9292/people')
    .then(res => res.json())
    .then(data => setPeople(data))
  }, [])

  const renderedPeople = people.map(person => {
    console.log(person)
    return <p>{person.name}</p>
  })

  function handleSubmit(event) {
    event.preventDefault()

    fetch('http://localhost:9292/people', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({
        person: {
          name: formState.name,
          age: formState.age,
          "alive?": formState["alive?"]
        },
        shark_bite: {
          pain: formState.pain,
          location: formState.location
        }
      })
    })
    .then(res => res.json())
    .then(newPerson => {
      setPeople([...people, newPerson])
    })
  }

  return (
    <div className="App">

      <h1>Shark Bites!!!</h1>

      {renderedPeople}

      <form onSubmit={handleSubmit}>

        <label>Name</label>

        <input name="name" value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} />

        <label>Age</label>

        <input type="number" name="age" value={formState.age} onChange={e => setFormState({ ...formState, age: e.target.value })} />

        <label>Alive?</label>

        <input name="alive?" value={formState["alive?"]} onChange={e => setFormState({ ...formState, "alive?": e.target.value })} />

        <label>Pain</label>

        <input name="pain" value={formState.pain} onChange={e => setFormState({ ...formState, pain: e.target.value })} />

        <label>Location</label>

        <input name="location" value={formState.location} onChange={e => setFormState({ ...formState, location: e.target.value })} />

        <input type="submit" value="Add Person to DB" />


      </form>

    </div>
  );
}

export default App;
