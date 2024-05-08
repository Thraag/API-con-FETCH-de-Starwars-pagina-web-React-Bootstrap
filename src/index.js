import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./css.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [inputValue, setInputValue] = useState("");

  const [peopleList, setPeopleList] = useState([]);
  const [planetsList, setPlanetsList] = useState([]); // Added state for planetsList
  const [starshipsList, setStarshipsList] = useState([]); // Added state for starshipsList

  let url = `https://www.swapi.tech/api/people/?name=${inputValue}`;
  let url2 = `https://www.swapi.tech/api/planets/?name=${inputValue}`;
  let url3 = `https://www.swapi.tech/api/starships/?name=${inputValue}`;

  function GET() {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    };

    // Fetch for characters
    fetch(url, options)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        console.log(data.result)
        setPeopleList(data.result);
      })
      .catch(error => {
        console.error('Error en la solicitud GET (characters):', error);
      });
      


    // Fetch for planets
    fetch(url2, options)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setPlanetsList(data.result);
      })
      .catch(error => {
        console.error('Error en la solicitud GET (planets):', error);
      });



    // Fetch for starships
    fetch(url3, options)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setStarshipsList(data.result);
      })
      .catch(error => {
        console.error('Error en la solicitud GET (starships):', error);
      });
  }

  return (
    <div className='container'>
      <h1 className='h1title'>Star Wars Searcher</h1>
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            GET();
          }
        }}
        placeholder='Key your Planet , Starship or Character!'
      />






      <h2 className='secondTitle'>Characters</h2>
      <div className='card-container'>
        {peopleList.map((person, index) => (
          <div key={index} className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src="https://via.placeholder.com/150"  />
            <div className="card-body">
              <h5 className="card-title">{person.properties.name}</h5>
              <p className="card-text">Hair Color: {person.properties.hair_color}</p>
              <p className="card-text">Eye Color: {person.properties.eye_color}</p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-primary">See now!</button>
                <button class="btn btn-primary"><i class="fa-solid fa-heart"></i></button>
              </div>

            </div>
          </div>
        ))}
      </div>

      <h2 className='secondTitle'>Planets</h2>
      <div className='card-container'>
        {planetsList.map((planet, index) => (
          <div key={index} className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src="https://via.placeholder.com/150" />
            <div className="card-body">
              <h5 className="card-title">{planet.properties.name}</h5>
              <p className="card-text">Diameter: {planet.properties.diameter}</p>
              <p className="card-text">Climate: {planet.properties.climate}</p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-primary">See now!</button>
                <button class="btn btn-primary"><i class="fa-solid fa-heart"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className='secondTitle'>Starships</h2>
      <div className='card-container'>
        {starshipsList.map((starship, index) => (
          <div key={index} className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src="https://via.placeholder.com/150"  />
            <div className="card-body">
              <h5 className="card-title">{starship.properties.name}</h5>
              <p className="card-text">Model: {starship.properties.model}</p>
              <p className="card-text">Starship Class: {starship.properties.starship_class}</p>
              <div class="last d-flex justify-content-between">
                <button class="btn btn-primary">See now!</button>
                <button class="btn btn-primary"><i class="fa-solid fa-heart"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className='buttonclass' onClick={GET}>Make Your Search!</button>
    </div>
  );
}

ReactDOM.render(
  <Home />,
  document.querySelector("#app")
);


// console.log(data.result[0].properties.mass);
// FIJATE BIEN SIEMPRE LA RUTA DE ACCESO A LA INFO, EN ESTE CASO DATA.RESULT.PROPIESTIES DICE MUCHO!!!
//NO ES NECESARIO PEDIR TODO EN EL FETCH, COMO VES EN EL FETCH SOLO PEDISTE LA DATA.RESULTS. Y LUEGO EN LOS CARD
// ENTRASTE HASTA PROPERTIES