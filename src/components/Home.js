import React, {useEffect, useState} from 'react';
import "../customcss/mystylesheet.css"
import picture from "../img/gladiator-1931077_1280.jpg"

function Home(){
  const [allData, setAllData] = useState([])
  const [isLoaded, setLoaded] = useState(false)
  const [reg1, setReg1] = useState(0)
  const [reg2, setReg2] = useState(0)
  const [reg3, setReg3] = useState(0)
  const [reg4, setReg4] = useState(0)
  const [reg5, setReg5] = useState(0)
  const [reg6, setReg6] = useState(0)
  const [reg7, setReg7] = useState(0)
  const [reg8, setReg8] = useState(0)
  const [reg9, setReg9] = useState(0)
  const [reg10, setReg10] = useState(0)
  const [reg11, setReg11] = useState(0)
  const [reg12, setReg12] = useState(0)


  useEffect(() => {
    async function fetchData(){
      await fetch('http://localhost:3001/wars')
          .then(response => {
            return response.json()
          })
          .then(data => {
            setAllData(data)
            setLoaded(true)
          })
          .catch(error => console.log(error)
          )
    }
    fetchData()
  },[])

  useEffect(() => {
    allData.forEach(function(el) {
      if(el.Region === 1){
        setReg1(reg1 => reg1 + 1)
      }
      else if(el.Region === 2){
        setReg2(reg2 => reg2 + 1)
      }
      else if(el.Region === 3){
        setReg3(reg3 => reg3 + 1)
      }
      else if(el.Region === 4){
        setReg4(reg4 => reg4 + 1)
      }
      else if(el.Region === 5){
        setReg5(reg5 => reg5 + 1)
      }
      else if(el.Region === 6){
        setReg6(reg6 => reg6 + 1)
      }
      else if(el.Region === 7){
        setReg7(reg7 => reg7 + 1)
      }
      else if(el.Region === 8){
        setReg8(reg8 => reg8 + 1)
      }
      else if(el.Region === 9){
        setReg9(reg9 => reg9 + 1)
      }
      else if(el.Region === 10){
        setReg10(reg10 => reg10 + 1)
      }
      else if(el.Region === 11){
        setReg11(reg11 => reg11 + 1)
      }
      else if(el.Region === 12){
        setReg12(reg12 => reg12 + 1)
      }
    })
  },[allData])


  return(
      <div className="homePage">
        <h1>
          Tervetuloa tutkimaan sotahistoriaa!
        </h1>
        <p>
          Tällä sivustolla voit hakea tietoa vuosien 1400-2000 välillä käydyistä
          sodista. Sotia voi hakea esimerkiksi alkamisajankohdalla tai sodan
          maantieteellisellä sijainnilla. Tietokanta perustuu Peter Brecken
          <a href="https://brecke.inta.gatech.edu/research/conflict/" target="_blank" > kokoamaan dataan</a>.
        </p>

        <div className="homePageLeft">
          Tietokannasta löytyy yhteensä
          <p><span className="totalNumbersAll">
            {allData.length} sotaa
          </span></p>
          Sodat jakautuvat seuraaviin alueisiin:<br/>
          <ul>
            <li>Pohjois- ja Väli-Amerikka sekä Karibia <span className="totalNumbers">{reg1}</span></li>
            <li>Etelä-Amerikka <span className="totalNumbers">{reg2}</span></li>
            <li>Länsi-Eurooppa <span className="totalNumbers">{reg3}</span></li>
            <li>Itä-Eurooppa <span className="totalNumbers">{reg4}</span></li>
            <li>Lähi-Itä <span className="totalNumbers">{reg5}</span></li>
            <li>Pohjois-Afrikka <span className="totalNumbers">{reg6}</span></li>
            <li> Keski- ja Länsi-Afrikka <span className="totalNumbers">{reg7}</span></li>
            <li> Etelä- ja Itä-Afrikka <span className="totalNumbers">{reg8}</span></li>
            <li>Keski-Aasia <span className="totalNumbers">{reg9}</span></li>
            <li>Etelä-Aasia <span className="totalNumbers">{reg10}</span></li>
            <li>Kaakkois-Aasia <span className="totalNumbers">{reg11}</span></li>
            <li>Itä-Aasia <span className="totalNumbers">{reg12}</span></li>
          </ul>
        </div>

        <div className="homePageRight">
          Sivustolla voit tehdä hakuja tietokantaan sekä lisätä uusia sotia.
          Hakuja voi tehdä useilla eri hakuvaihtoehdoilla.<br/>
          Palautettava JSON on muodossa:<br/>
            {!isLoaded &&
            <div className="loadingText">Lataa tietokantaa<span className="loadingDot">.</span>
              <span className="loadingDot">.</span><span className="loadingDot">.</span></div>
            }
            {isLoaded &&
            <div className="jsonText">
            <pre>
              {JSON.stringify(allData[0], null, 2)}
            </pre>
            </div>
            }
        </div>
        <div className="homePageBottom">
          <img src={picture} className="homepicture" alt="Medieval war gear"/>
        </div>
      </div>
  )
}

export default Home