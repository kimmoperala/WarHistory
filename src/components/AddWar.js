import React, {useEffect, useState} from 'react';
import "../customcss/mystylesheet.css";


const axios = require('axios');

function AddWar(){
  const [options, setOptions] = useState(null);
  const [known, setKnown] = useState();
  const [name, setName] = useState();
  const [count, setCount] = useState();
  const [milFatalities, setMilFatalities] = useState();
  const [totalFatalities, setTotalFatalities] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [region, setRegion] = useState();

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
    ["Itä-Aasia",12]]

  useEffect( () => {
    let temp = [];
    regions.forEach(function(entry){
      temp.push(<option key={entry[1]} value={entry[1]}>{entry[0]}</option>)
    })
    setOptions(temp);
  }, [])
  function handleSubmit(event){
    event.preventDefault();
    console.log(known, name, count, milFatalities, totalFatalities, startDate, endDate, region)
    let data = {
      query: {
        CommonName: {known}.value,
        Name: {name}.value,
        NumberActors: {count}.value,
        MilFatalities: {milFatalities}.value,
        TotalFatalities: {totalFatalities}.value,
        //StartYear: {},
        //StartMonth: {},
        //StartDay: {},
        //EndYear: {},
        //EndMonth: {},
        //EndDay: {},
        Region: {region}.value
        //DurationD: {},
        //DurationM: {},
        //DurationÝ: {},

      }
    }
    axios.post("http://localhost:3001/wars", data).then(response => response.data);

  }
  return (
      <div className="addForm">
        <h2>Lisää tietokantaan puuttuvan sodan tiedot</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Yleisesti käytössä oleva nimi</td>
                <td><input type="text" id="known" size="100" onChange={e => setKnown(e.target.value)}/></td>
              </tr>
              <tr>
                <td>Sodan osapuolet/nimi</td>
                <td><input type="text" id="name" size="50" onChange={e => setName(e.target.value)}/></td>
              </tr>
              <tr>
                <td>Sotaan osallistuneiden maiden lukumäärä</td>
                <td><input type="number" id="count" onChange={e => setCount(e.target.value)}/></td>
              </tr>
              <tr>
                <td>Kuolleiden sotilaiden määrä</td>
                <td><input type="number" id="milFatalities" onChange={e => setMilFatalities(e.target.value)}/></td>
              </tr>
              <tr>
                <td>Kuolleiden määrä yhteensä</td>
                <td><input type="number" id="totalFatalities" onChange={e => setTotalFatalities(e.target.value)}/></td>
              </tr>
              <tr>
                <td>Sodan aloituspäivämäärä</td>
                <td><input type="date" id="startDate" onChange={e => setStartDate(e.target.value)} required/></td>
              </tr>
              <tr>
                <td>Sodan lopetuspäivämäärä</td>
                <td><input type="date" id="endDate" onChange={e => setEndDate(e.target.value)} required/></td>
              </tr>
              <tr>
                <td>Sodan pääasiallinen sijainti</td>
                <td><select id="region" onChange={e => setRegion(e.target.value)} required> {options} </select>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Lähetä tiedot"/>
        </form>
      </div>
  )
}

export default AddWar;