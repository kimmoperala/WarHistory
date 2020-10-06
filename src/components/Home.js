import React, {useEffect, useState} from 'react';
import "../customcss/mystylesheet.css"
import picture from "../img/gladiator-1931077_1280.jpg"

function Home(){
  const [allData, setAllData] = useState([])
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
      if(el.Region === 2){
        setReg2(reg2 => reg2 + 1)
      }
      if(el.Region === 3){
        setReg3(reg3 => reg3 + 1)
      }
      if(el.Region === 4){
        setReg4(reg4 => reg4 + 1)
      }
      if(el.Region === 5){
        setReg5(reg5 => reg5 + 1)
      }
      if(el.Region === 6){
        setReg6(reg6 => reg6 + 1)
      }
      if(el.Region === 7){
        setReg7(reg7 => reg7 + 1)
      }
      if(el.Region === 8){
        setReg8(reg8 => reg8 + 1)
      }
      if(el.Region === 9){
        setReg9(reg9 => reg9 + 1)
      }
      if(el.Region === 10){
        setReg10(reg10 => reg10 + 1)
      }
      if(el.Region === 11){
        setReg11(reg11 => reg11 + 1)
      }
      if(el.Region === 12){
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
          sodista. Sotia voi hakea esimerkiksia alkamisajankohdalla tai sodan
          maantieteellisellä sijainnilla.
        </p>
        <div className="homePageLeft">
          Tietokannasta löytyy yhteensä<br/>
          <span className="totalNumbers">
            {allData.length}
          </span> sotaa. Sodat jakautuvat seuraaviin alueisiin:<br/>
          Pohjois- ja Väli-Amerikka  sekä Karibia <span className="totalNumbers">{reg1}</span> sotaa<br/>
          Etelä-Amerikka <span className="totalNumbers">{reg2}</span> sotaa<br/>
          Länsi-Eurooppa <span className="totalNumbers">{reg3}</span> sotaa<br/>
          Itä-Eurooppa <span className="totalNumbers">{reg4}</span> sotaa<br/>
          Lähi-Itä <span className="totalNumbers">{reg5}</span> sotaa<br/>
          Pohjois-Afrikka <span className="totalNumbers">{reg6}</span> sotaa<br/>
          Keski- ja Länsi-Afrikka <span className="totalNumbers">{reg7}</span> sotaa<br/>
          Etelä- ja Itä-Afrikka <span className="totalNumbers">{reg8}</span> sotaa<br/>
          Keski-Aasia <span className="totalNumbers">{reg9}</span> sotaa<br/>
          Etelä-Aasia <span className="totalNumbers">{reg10}</span> sotaa<br/>
          Kaakkois-Aasia <span className="totalNumbers">{reg11}</span> sotaa<br/>
          Itä-Aasia <span className="totalNumbers">{reg12}</span> sotaa<br/>
        </div>
        <div className="homePageRight">
          Sivustolla voit tehdä hakuja tietokantaan sekä lisätä uusia sotia.
          Hakuja voi tehdä useilla eri hakuvaihtoehdoilla.<br/>
          Palautettava JSON on muodossa:<br/>
          <div>
            {JSON.stringify(allData[0], null, 2)}
          </div>
        </div>
        <div className="homePageBottom">
          <img src={picture} className="homepicture" responsive alt="Picture of warfare"/>
        </div>
      </div>
  )
}

export default Home