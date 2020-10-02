import React from "react";
import {useState} from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

function SearchWar(){

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

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
    "Itä-Aasia"]

  function handleClick(){
    let data = {
      query: {
        StartYear: {startYear},
        EndYear: {endYear}
      }
    }

    console.log(data);

    fetch('http://localhost:3001/wars?' + 'warStarted=' + startYear + '&' + 'warEnded=' + endYear)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }


  return(
    <div className="searchWarTop">
      <h2>
        ETSI SOTA!
      </h2>
      <Form>
        <Form.Group as={Col} md="4">
          <Form.Label>Aloitus vuosi</Form.Label>
          <Form.Control
            type="text"
            onChange={e => setStartYear(e.target.value)}
          />

        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Lopetus vuosi</Form.Label>
          <Form.Control
            type="text"
            onChange={e => setEndYear(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formSearchRegion">
          <Form.Label>Etsi alueiden perusteella</Form.Label>

          {regions.map((name)=>(

            <Form.Check key={`${name}`}
              type="checkbox"
              label={name}
              value={regions.indexOf(name) + 1}
            />
          ))}
        </Form.Group>

        <Form.Group>
          <Button onClick={handleClick}>Hae</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
export default SearchWar
