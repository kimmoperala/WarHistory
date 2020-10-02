import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

function SearchWar(){

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

  function handleAllCheck(){
    
  }

  function handleSubmit(e){
    e.preventDefault();
  }


  return(
    <div className="searchWarTop">
      <h2>
        ETSI SOTA!
      </h2>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group as={Col} md="4">
          <Form.Label>Start year</Form.Label>
          <Form.Control
            type="text"
          />

        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>End year</Form.Label>
          <Form.Control
            type="text"
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
          <Button type="submit">Hae</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
export default SearchWar
