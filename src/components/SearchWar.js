import React from "react";
import { useState, useEffect } from "react";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import "../customcss/mystylesheet.css";

function SearchWar(){

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [wars, setWars] = useState(null);
  const [region, setRegion] = useState("");
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const [regionOptionsForEdit, setRegionsOptionsForEdit] = useState(null);
  
  const [editableCommonName, setEditableCommonName] = useState("");
  const [editableName, setEditableName] = useState("");
  const [editableStartYear, setEditableStartYear] = useState("");
  const [editableEndYear, setEditableEndYear] = useState("");
  const [editableRegion, setEditableRegion] = useState(null);

  const regions = [
    ["Pohjois- ja Väli-Amerikka sekä Karibia", 1],
    ["Etelä-Amerikka",2],
    ["Länsi-Eurooppa",3],
    ["Itä-Eurooppa",4],
    ["Lähi-Itä",5],
    ["Pohjois-Afrikka",6],
    ["Keski- ja Länsi-Afrikka",7],
    ["Etelä- ja Itä-Afrikka",8],
    ["Keski-Aasia",9],
    ["Etelä-Aasia",10],
    ["Kaakkois-Aasia",11],
    ["Itä-Aasia",12]];

  useEffect( () => {
    let temp = [];
    regions.forEach(function(entry){
      temp.push(<option key={entry[1]} value={entry[1]}>{entry[0]}</option>)
    })
    setRegionsOptionsForEdit(temp);
  }, [])

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

  function handleEditClick(war){
    
    setEditableCommonName(war.CommonName);
    setEditableName(war.Name);
    setEditableStartYear(war.StartYear);
    setEditableEndYear(war.EndYear);
    //setEditableRegion();

    setEditModeIndex(wars.indexOf(war));
  }

  function handleConfirmClick(war){
    wars[wars.indexOf(war)].CommonName = editableCommonName;
    wars[wars.indexOf(war)].Name = editableName;
    wars[wars.indexOf(war)].StartYear = editableStartYear;
    wars[wars.indexOf(war)].EndYear = editableEndYear;
    //wars[wars.indexOf(war)].Region = getRegionNumberByCommonName(editableRegion);
    setEditModeIndex(-1);
  }

  function handleCancelClick(){
    setEditModeIndex(-1);
  }

  function getRegionByNumber(number){
    return regions[number - 1][0];
  }

  function getRegionNumberByCommonName(name){

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
          {regions.map((region)=>(

          <div className="form-check" key={region[1]}>
            <label>
              <input
                type="radio"
                value={region[1]}
                className="form-check-input"
                name="regionSelection"
                onChange={() => handleRadioChange(region[0])}
              />
              {region[0]}
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
            <th>Sodan osapuolet/Nimi</th>
            <th>Aloitus vuosi</th>
            <th>Lopetusvuosi</th>
            <th>Pääasiallinen sota-alue</th>
            <th>Muokkaa</th>
          </tr>
        </thead>
        <tbody>
        {wars.map((war) => (
          <tr key={war._id}>
            {editModeIndex !== wars.indexOf(war) && <td>{war.CommonName}</td>} {editModeIndex === wars.indexOf(war) && <td><Form.Control type="text" defaultValue={war.CommonName} onChange={e => setEditableCommonName(e.target.value)}/></td>}
            {editModeIndex !== wars.indexOf(war) && <td>{war.Name}</td>} {editModeIndex === wars.indexOf(war) && <td><Form.Control type="text" defaultValue={war.Name} onChange={e => setEditableName(e.target.value)}/></td>}
            {editModeIndex !== wars.indexOf(war) &&<td>{war.StartYear}</td>} {editModeIndex === wars.indexOf(war) && <td><Form.Control type="text" defaultValue={war.StartYear} onChange={e => setEditableStartYear(e.target.value)}/></td>}
            {editModeIndex !== wars.indexOf(war) &&<td>{war.EndYear}</td>} {editModeIndex === wars.indexOf(war) && <td><Form.Control type="text" defaultValue={war.EndYear} onChange={e => setEditableEndYear(e.target.value)}/></td>}
            {editModeIndex !== wars.indexOf(war) &&<td>{getRegionByNumber(war.Region)}</td>} {editModeIndex === wars.indexOf(war) && <td><Form.Control as="select" onChange={e => setEditableRegion(e.target.value)}>{regionOptionsForEdit}</Form.Control></td>} 
            {editModeIndex !== wars.indexOf(war) &&<td><Button onClick={() => handleEditClick(war)}>Muokkaa</Button></td>} 
            {editModeIndex === wars.indexOf(war) && <td><Button variant="success" onClick={() => handleConfirmClick(war)}>&#9745;</Button> <Button variant="danger" onClick={() => handleCancelClick()}>&#9746;</Button></td>}
          </tr>
        ))}
        </tbody>
      </Table>
      }
    </div>
  )
}
export default SearchWar
