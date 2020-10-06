import React from "react";
import {useState} from "react";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import "../customcss/mystylesheet.css";

function SearchWar(){

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [wars, setWars] = useState(null);
  const [region, setRegion] = useState("");

  let regions = [
    "Pohjois- ja Väli-Amerikka sekä Karibia",
    "Etelä-Amerikka",
    "Länsi-Eurooppa",
    "Itä-Eurooppa",
    "Lähi-Itä",
    "Pohjois-Afrikka",
    "Keski- ja Länsi-Afrikka",
    "Etelä- ja Itä-Afrikka ",
    "Keski-Aasia",
    "Etelä-Aasia",
    "Kaakkois-Aasia",
    "Itä-Aasia"
  ];
  
  const handleSearchClick = async () => {

    fetch('http://localhost:3001/wars?warStarted=' + startYear + '&warEnded=' + endYear + '&region=' + region)
    .then(response => response.json())
    .then(data => {

      setWars(data);
      console.log(data)
    })
    .catch(error => console.log(error))
  }

  function handleEmptyClick(){
    Array.from( document.querySelectorAll('input[name="regionSelection"]:checked'), input => input.checked = false );
    setRegion("");
  }

  function getRegion(number){
    return regions[number - 1];
  }

  function handleRadioChange(name){
    setRegion(regions.indexOf(name) + 1)
  }

  return(
    <div className="searchWarTop">
      <h2>
        ETSI SOTA!
      </h2>
      <Form>
        <Form.Group as={Row}>
          <Form.Group as={Col} md="3">
            <Form.Label>Aloitus vuosi</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setStartYear(e.target.value)}
            />

          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label>Lopetus vuosi</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setEndYear(e.target.value)}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group as={Col} controlId="formSearchRegion">
          <Form.Label>Etsi alueiden perusteella</Form.Label>
          <Form.Group>
            <Button variant="outline-danger" onClick={handleEmptyClick}>Tyhjennä valinta</Button>
          </Form.Group>
          {regions.map((name)=>(

          <div className="form-check" key={name}>
            <label>
              <input
                type="radio"
                value={regions.indexOf(name) + 1}
                className="form-check-input"
                name="regionSelection"
                onChange={() => handleRadioChange(name)}
              />
              {name}
            </label>
          </div>
          ))}

        </Form.Group>

        <Form.Group>
          <Button onClick={handleSearchClick}>Hae</Button>
        </Form.Group>
      </Form>

      {wars &&
      <Table bordered className="searchResultTable" striped>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Aloitus vuosi</th>
            <th>Lopetusvuosi</th>
            <th>Pääasiallinen sota-alue</th>
            <th>Muokkaa</th>
          </tr>
        </thead>
        <tbody>
        {wars.map((war) => (
          <tr key={war._id}>
            <td>{war.Name}</td>
            <td>{war.StartYear}</td>
            <td>{war.EndYear}</td>
            <td>{getRegion(war.Region)}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      }
    </div>
  )
}
export default SearchWar
