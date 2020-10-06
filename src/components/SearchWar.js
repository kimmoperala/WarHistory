import React from "react";
import { useState, useEffect } from "react";
import { Form, Col, Row, Button, Table, Alert } from "react-bootstrap";
import "../customcss/mystylesheet.css";

const axios = require('axios');

function SearchWar(){

  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [wars, setWars] = useState(null);
  const [region, setRegion] = useState(null);
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const [regionOptionsForEdit, setRegionsOptionsForEdit] = useState(null);
  
  const [editableCommonName, setEditableCommonName] = useState("");
  const [editableName, setEditableName] = useState("");
  const [editableStartYear, setEditableStartYear] = useState("");
  const [editableEndYear, setEditableEndYear] = useState("");
  const [editableRegion, setEditableRegion] = useState(null);

  const [requestActive, setrequestActive] = useState(false);
  const [showEditStatus, setshowEditStatus] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    variant: "warning",
    text: ""
  });

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

  const handleSearchClick = async (e) => {
    e.preventDefault();
    setrequestActive(true);
    let url = 'http://localhost:3001/wars';

    if(startYear !== null){
      url = url + '?warStarted=' + startYear;
    }
    if(endYear !== null && startYear === null){
      url = url + '?warEnded=' + endYear;
    }else if(endYear !== null && startYear !== null){
      url = url + '&warEnded=' + endYear;
    }
    if(region !== null && startYear === null && endYear === null){
      url = url + '?region=' + region;
    }else if(region !== null && (startYear !== null || endYear !== null)){
      url = url + '&region=' + region;
    }

    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(data => {
      setrequestActive(false);
      setWars(data);
      console.log(data)
    })
    .catch(error => console.log(error))
  }

  function handleEmptyClick(){
    Array.from( document.querySelectorAll('input[name="regionSelection"]:checked'), input => input.checked = false );
    Array.from( document.querySelectorAll('input[name="warYears"]'), input => input.value = "" );
    setRegion(null);
    setStartYear("");
    setEndYear("");
  }

  function handleEmptySearch(){
    setEditModeIndex(-1);
    setWars(null);
  }

  function handleEditClick(war){
    
    setEditableCommonName(war.CommonName);
    setEditableName(war.Name);
    setEditableStartYear(war.StartYear);
    setEditableEndYear(war.EndYear);
    setEditableRegion(war.Region);

    setEditModeIndex(wars.indexOf(war));
  }

  const handleConfirmClick = async (war) => {
    
    war.CommonName = editableCommonName;
    war.Name = editableName;
    war.StartYear = editableStartYear;
    war.EndYear = editableEndYear;
    war.Region = editableRegion;
    setEditModeIndex(-1);
    console.log(war);
    axios.put('http://localhost:3001/wars', 
    {
      "_id": war._id,
      "Name": war.Name,
      "CommonName": war.CommonName,
      "StartYear": war.StartYear,
      "EndYear": war.EndYear,
      "Region": war.Region
    })
    .then(r => {
      if(r.status === 200){
        let temp = {
          variant: "success",
          text: "Tiedot päivitetty onnistuneesti"
        }
        setAlertConfig(temp);
        setshowEditStatus(true);
      }else{
        let temp = {
          variant: "danger",
          text: "Jokin meni vikaan tietoja päivitettäessä"
        }
        setAlertConfig(temp);
        setshowEditStatus(true);
      }

    })
    .catch(e => console.log(e))
  }

  function handleCancelClick(){
    setEditModeIndex(-1);
  }

  function handleDeleteClick(war){


    let tempWars = Array.from(wars);
    tempWars.splice(tempWars.indexOf(war), 1);
    setWars(tempWars);


  }

  function getRegionByNumber(number){

    if(number === null){
      return "Aluetta ei löytynyt";
    }

    for(let i=0; i<regions.length;i++){
      if(parseInt(number) === regions[i][1]){
        return regions[i][0];
      }
    }
    return "Aluetta ei löytynyt";
  }

  function handleRadioChange(region){
    setRegion(regions.indexOf(region) + 1)
  }

  return(
    <div className="searchWarTop">

      <h2>
        ETSI SOTA!
      </h2>
      <Form onSubmit={e => handleSearchClick(e)}>
        <Form.Group as={Row}>
          <Form.Group as={Col} md="3">
            <Form.Label>Sota lakanut aikaisintaan:</Form.Label>
            <Form.Control
              name="warYears"
              type="number"
              min="1"
              onChange={e => setStartYear(e.target.value)}
            />

          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label>Sota loppunut viimeistään:</Form.Label>
            <Form.Control
              name="warYears"
              type="number"
              min={startYear}
              onChange={e => setEndYear(e.target.value)}
            />
          </Form.Group>
        </Form.Group>
    
        <Form.Group as={Col} controlId="formSearchRegion">
          <Form.Label>Etsi alueiden perusteella</Form.Label>
          {regions.map((region)=>(

          <div className="form-check" key={region[1]}>
            <label>
              <input
                type="radio"
                value={region[1]}
                className="form-check-input"
                name="regionSelection"
                onChange={() => handleRadioChange(region)}
              />
              {region[0]}
            </label>
          </div>
          ))}
        </Form.Group>

        <Form.Group>
          <Button type="submit" disabled={requestActive}>Hae</Button> <Button variant="outline-danger" onClick={handleEmptyClick}>Tyhjennä</Button>
        </Form.Group>
      </Form>

      <Alert variant={alertConfig.variant} show={showEditStatus} onClose={() => setshowEditStatus(false)} dismissible>
        <p>
          {alertConfig.text}
        </p>
      </Alert>

      {wars &&
      <div>
        <Button variant="outline-danger"onClick={handleEmptySearch}>Poista hakutulokset</Button>
        <div className="resTable">
        <Table bordered className="searchResultTable" striped>
          <thead>
            <tr>
              <th>Nimi</th>
              <th>Sodan osapuolet/Nimi</th>
              <th>Aloitusvuosi</th>
              <th>Lopetusvuosi</th>
              <th>Pääasiallinen sota-alue</th>
              <th>Muokkaa</th>
              <th>Poista</th>
            </tr>
          </thead>
          <tbody>
          {wars.map((war) => (
            <tr key={war._id}>
              {editModeIndex !== wars.indexOf(war) && <td>{war.CommonName}</td>}{editModeIndex === wars.indexOf(war) && <td><Form.Control type="text" defaultValue={war.CommonName} onChange={e => setEditableCommonName(e.target.value)}/></td>}
              {editModeIndex !== wars.indexOf(war) && <td>{war.Name}</td>}{editModeIndex === wars.indexOf(war) && <td><Form.Control type="text" defaultValue={war.Name} onChange={e => setEditableName(e.target.value)}/></td>}
              {editModeIndex !== wars.indexOf(war) &&<td>{war.StartYear}</td>}{editModeIndex === wars.indexOf(war) && <td><Form.Control type="number" min="1400" max={editableEndYear} defaultValue={war.StartYear} onChange={e => setEditableStartYear(e.target.value)}/></td>}
              {editModeIndex !== wars.indexOf(war) &&<td>{war.EndYear}</td>}{editModeIndex === wars.indexOf(war) && <td><Form.Control type="number" min={editableStartYear} defaultValue={war.EndYear} onChange={e => setEditableEndYear(e.target.value)}/></td>}
              {editModeIndex !== wars.indexOf(war) &&<td>{getRegionByNumber(war.Region)}</td>}{editModeIndex === wars.indexOf(war) && <td><Form.Control as="select" defaultValue={war.Region} onChange={e => setEditableRegion(e.target.value)}>{regionOptionsForEdit}</Form.Control></td>}
              {editModeIndex !== wars.indexOf(war) &&<td><Button onClick={() => handleEditClick(war)}>Muokkaa</Button></td>}{editModeIndex === wars.indexOf(war) && <td><Button variant="success" onClick={() => handleConfirmClick(war)}>&#9745;</Button><Button variant="danger" onClick={() => handleCancelClick()}>&#9746;</Button></td>}
              {<td><Button variant="danger" onClick={() => handleDeleteClick(war)}>Poista</Button></td>}
            </tr>
          ))}
          </tbody>
        </Table>
        </div>
      </div>
      }
    </div>
  )
}
export default SearchWar
