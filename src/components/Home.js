import React from "react";
import "../customcss/mystylesheet.css"

function Home(){
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
      </div>
  )
}

export default Home