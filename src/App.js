import React, {useState} from 'react';
import './App.css';
import * as axios from "axios";



function App() {
    const [number, setNumber] = useState("")
    const [result, setResult] = useState("")
    const [resultPlanet, setResultPlanet] = useState("")

    function getPeople(event){
        event.preventDefault();
        console.log(number);
        axios.get("https://swapi.dev/api/people/" + number)
            .then(response=>{
                setResult(response.data);
                console.log(response.data)
                getPlanet(response.data)
            })

    }

    function getPlanet(result) {
        if (result) {
            axios.get(result.homeworld)
                .then(response=> {
                    setResultPlanet(response.data)
                    console.log(response.data)
                })
        }
    }

    function displayPlanets() {
        return <p>{resultPlanet.name}</p>
    }

    function displayPeople() {
        return <p>{result.name}</p>
    }

    function updateNumber(event) {
        setNumber(event.target.value)
    }
  return (
    <div className="App">
        <form onSubmit={getPeople}>
            <input type="text" placeholder="number" onChange={updateNumber}/>
            <button type="submit" value="valider">Valider</button>
        </form>
        {displayPeople()}
        {displayPlanets()}
    </div>
  );
}

export default App;
