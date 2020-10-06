import React, {useEffect, useState} from 'react';
import "../customcss/mystylesheet.css";


const axios = require('axios');

function AddWar(){
  const [message, setMessage] = useState("Place");
  const [options, setOptions] = useState(null);
  const [known, setKnown] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [milFatalities, setMilFatalities] = useState(0);
  const [totalFatalities, setTotalFatalities] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [region, setRegion] = useState(1);

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
  function resetDefaultValues(){
    setKnown("");
    setName("");
    setCount(0);
    setMilFatalities(0);
    setTotalFatalities(0);
    setStartDate(null);
    setEndDate(null);
    setRegion(1);
    document.getElementById("addForm").reset();
    setMessage("Tiedot lähetettiin onnistuneesti!")

  }
  function handleSubmit(event){
    event.preventDefault();
    console.log(known, name, count, milFatalities, totalFatalities, startDate.split("-")[0], endDate, region)
    let startYear = startDate.split("-")[0]
    let startDay = startDate.split("-")[2]
    let startMonth = startDate.split("-")[1]
    let endYear = endDate.split("-")[0]
    let endDay = endDate.split("-")[2]
    let endMonth = endDate.split("-")[1]
    let totalDurationInDays = calculateDays(endYear, endMonth, endDay, startYear, startMonth, startDay)
    let durationInYears = Math.floor(totalDurationInDays/365);
    let durationInMonths = Math.floor((totalDurationInDays % 365) / 30);
    let durationInDays = Math.floor((totalDurationInDays % 365) % 30);
    console.log(totalDurationInDays, durationInYears, durationInMonths, durationInDays)
    let data = {
        CommonName: known,
        Name: name,
        NumberActors: count,
        MilFatalities: milFatalities,
        TotalFatalities: totalFatalities,
        StartYear: startYear,
        StartMonth: startMonth,
        StartDay: startDay,
        EndYear: endYear,
        EndMonth: endMonth,
        EndDay: endDay,
        Region: region,
        DurationD: durationInDays,
        DurationM: durationInMonths,
        DurationY: durationInYears
    }
    console.log(data);
    axios.post("http://localhost:3001/wars", data).then(response => response.data).then( () => resetDefaultValues())
  }
  useEffect(() => {
    setMessage("");

  },[known, name, count, milFatalities, totalFatalities, startDate, endDate, region])

  function calculateDays(endYear, endMonth, endDay, startYear, startMonth, startDay){
    let days = 0;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(startYear, startMonth, startDay);
    const secondDate = new Date(endYear, endMonth, endDay);

    days = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return days
  }

  return (
      <div className="addWar">
        <h2>Lisää tietokantaan puuttuvan sodan tiedot</h2>
        <form id="addForm" onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Yleisesti käytössä oleva nimi</td>
                <td><input type="text" id="known" size="50" placeholder="Talvisota" onChange={e => setKnown(e.target.value)}/></td>
              </tr>
              <tr>
                <td className="required">Sodan osapuolet</td>
                <td><input type="text" id="name" size="50" placeholder="Suomi vs Venäjä" onChange={e => setName(e.target.value)} required/></td>
              </tr>
              <tr>
                <td>Sotaan osallistuneiden maiden lukumäärä</td>
                <td><input type="number" id="count" min="1" placeholder="2" onChange={e => setCount(e.target.value)}/></td>
              </tr>
              <tr>
                <td>Kuolleiden sotilaiden määrä</td>
                <td><input type="number" id="milFatalities" min="0" placeholder="10000000" onChange={e => setMilFatalities(e.target.value)}/></td>
              </tr>
              <tr>
                <td>Kuolleiden määrä yhteensä</td>
                <td><input type="number" id="totalFatalities" placeholder="10000000" min={milFatalities} onChange={e => setTotalFatalities(e.target.value)}/></td>
              </tr>
              <tr>
                <td className="required">Sodan aloitus- ja lopetuspäivämäätä</td>
                <td><input type="date" id="startDate" onChange={e => setStartDate(e.target.value)} required/> - <input type="date" id="endDate" min={startDate} onChange={e => setEndDate(e.target.value)} required/></td>
              </tr>
              <tr>
                <td className="required">Sodan pääasiallinen sijainti</td>
                <td><select id="region" onChange={e => setRegion(e.target.value)} required> {options} </select>
                </td>
              </tr>
              <tr>
                <td><input type="submit" value="Lähetä tiedot"/></td>
                <td className="information">Tähdellä merkityt kentät ovat pakollisia</td>
              </tr>
            </tbody>
          </table>
        </form>
        <h4 className="confirmationMessage">
          {message}
        </h4>
      </div>
  )
}

export default AddWar;