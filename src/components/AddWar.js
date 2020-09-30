import React, {useEffect, useState} from 'react';
import "../customcss/mystylesheet.css"

function AddWar(){
  const [options, setOptions] = useState(null);
  const regions = [
      "Pohjois-Amerikka",
      "Etelä-Amerikka",
      "Länsi-Eurooppa",
      "Itä-Eurooppa",
      "Lähi-itä",
      "Pohjois-Afrikka",
      "Länsi ja Keski-Afrikka",
      "Itä ja Etelä-Afrikka",
      "Keski-Aasia",
      "Etelä-Aasia",
      "Kaakkois-Aasia",
      "Itä-Aasia"
  ];

  useEffect( () => {
    let temp = [];
    regions.forEach(function(entry){
      temp.push(<option key={entry} value={entry}>{entry}</option>)
    })
    setOptions(temp);
  }, [])
  function handleSubmit(event){
    //event.preventDefault();
    console.log(document.getElementById("known").value)
    console.log(document.getElementById("startDate").value)
  }
  return (
      <div className="addForm">
        <h2>Lisää tietokantaan puuttuvan sodan tiedot</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Yleisesti käytössä oleva nimi</td>
                <td><input type="text" id="known" size="100"/></td>
              </tr>
              <tr>
                <td>Sodan osapuolet/nimi</td>
                <td><input type="text" id="name" size="50"/></td>
              </tr>
              <tr>
                <td>Sotaan osallistuneiden maiden lukumäärä</td>
                <td><input type="text" id="count"/></td>
              </tr>
              <tr>
                <td>Kuolleiden sotilaiden määrä</td>
                <td><input type="text" id="milFatalities"/></td>
              </tr>
              <tr>
                <td>Kuolleiden määrä yhteensä</td>
                <td><input type="text" id="totalFatalities"/></td>
              </tr>
              <tr>
                <td>Sodan aloituspäivämäärä</td>
                <td><input type="date" id="startDate" required/></td>
              </tr>
              <tr>
                <td>Sodan lopetuspäivämäärä</td>
                <td><input type="date" id="endDate" required/></td>
              </tr>
              <tr>
                <td>Sodan pääasiallinen sijainti</td>
                <td><select id="region" required> {options} </select>
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