import React from "react";
import {useState} from "react";
import { Form, Col, Row, Button, ListGroup } from "react-bootstrap";


function SearchWar(){

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [wars, setWars] = useState(null);

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
  
  const handleClick = async () => {

    fetch('http://localhost:3001/wars?warStarted=' + startYear + '&warEnded=' + endYear)
    .then(response => response.json())
    .then(data => {

      setWars(data);
      console.log(data)
    })
    .catch(error => console.log(error))
  }

  function getRegion(number){
    return regions[number - 1];
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


      <ListGroup>    
            {wars && wars.map((item)=>(
                <ListGroup.Item>
                    <h3>{item.Name}</h3>
                    <p>
                        Aloitusvuosi: {item.StartYear} <br/>
                        Lopetusvuosi: {item.EndYear} <br/>
                        Pääasiallinen sota-alue: {getRegion(item.Region)}
                    </p>
                </ListGroup.Item>
            ))}
        </ListGroup>
    </div>
  )
}
export default SearchWar
