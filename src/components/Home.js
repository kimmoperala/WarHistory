import React, {useEffect, useState} from 'react';
import "../customcss/mystylesheet.css"

function Home(){
  const [allData, setAllData] = useState([])
  const [jsonExample, setJsonExample] = useState("")
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
      if(el.Region == 1){
        setReg1(reg1 => reg1 + 1)
        console.log("yks")
      }
      if(el.Region == 2){
        setReg2(reg2 => reg2 + 1)
        console.log("kaks")
      }
      if(el.Region == 3){
        setReg3(reg3 => reg3 + 1)
        console.log("kaks")
      }
      if(el.Region == 4){
        setReg4(reg4 => reg4 + 1)
        console.log("kaks")
      }
      if(el.Region == 5){
        setReg5(reg5 => reg5 + 1)
        console.log("kaks")
      }
      if(el.Region == 6){
        setReg6(reg6 => reg6 + 1)
        console.log("kaks")
      }
      if(el.Region == 7){
        setReg7(reg7 => reg7 + 1)
        console.log("kaks")
      }
      if(el.Region == 8){
        setReg8(reg8 => reg8 + 1)
        console.log("kaks")
      }
      if(el.Region == 9){
        setReg9(reg9 => reg9 + 1)
        console.log("kaks")
      }
      if(el.Region == 10){
        setReg10(reg10 => reg10 + 1)
        console.log("kaks")
      }
      if(el.Region == 11){
        setReg11(reg11 => reg11 + 1)
        console.log("kaks")
      }
      if(el.Region == 12){
        setReg12(reg12 => reg12 + 1)
        console.log("kaks")
      }
    })
    console.log(allData)
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
          Tietokannasta löytyy yhteensä <span style={{fontWeight: "bold"}} >
          <div>
            {allData.length}
          </div>
        </span> sotaa. Sodat jakautuvat seuraaviin alueisiin: Pohjois- ja Väli-Amerikka  sekä Karibia {reg1} <br />
          Etelä-Amerikka {reg2}<br/>
          Länsi-Eurooppa {reg3}<br/>
          Itä-Eurooppa {reg4}<br/>
          Lähi-Itä {reg5}<br/>
          Pohjois-Afrikka {reg6}<br/>
          Keski- ja Länsi-Afrikka {reg7}<br/>
          Etelä- ja Itä-Afrikka {reg8}<br/>
          Keski-Aasia {reg9}<br/>
          Etelä-Aasia {reg10}<br/>
          Kaakkois-Aasia {reg11}<br/>
          Itä-Aasia {reg12}<br/>
        </div>
        <div className="homePageRight">
          Sivustolla voit tehdä hakuja tietokantaan sekä lisätä uusia sotia.
          Hakuja voi tehdä useilla eri hakuvaihtoehdoilla.
        </div>
        <div className="homePageBottom">
          ALASLorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
  )
}

export default Home