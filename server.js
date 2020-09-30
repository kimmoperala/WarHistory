const express = require ('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const url = require('url')
const bodyParser = require('body-parser')
require('dotenv').config()
const uri = process.env.REACT_APP_DB_CONNECTION
// const router = express.Router()
const War = require('./src/schema')

mongoose.connect(uri, {useUnifiedTopology: true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}) )

// Routes

// GET all the wars in the collection
app.get("/wars/", function(req, res) {
  console.log("Kaikki")
  War.find({})
      .then(wars => {
        wars.forEach(war => {
          console.log(war)
        })
      })
      .catch(function(err) {
        console.log(err)
      })
})

// GET war by region, EXACT start year and/or EXACT end year, eg. /wars/multiple?startYear=1800&endYear=1900&region=3
app.get("/wars/multiple", async function(req, res) {
  const startYear = req.query.startYear
  const endYear = req.query.endYear
  const region = req.query.region

  // Create query of the db depending which fields are present
  var queryToMake = {}
  if (startYear){
    queryToMake.StartYear = startYear
  }
  if (endYear){
    queryToMake.EndYear = endYear
  }
  if (region){
    queryToMake.Region = region
  }
  console.log("queryToMake ", queryToMake)
  const foundWars = await War.find(queryToMake)
  res.send(foundWars)
})


// GET war by start year after lowLimit and end year before highLimit, eg. /wars/between?lowLimit=1000&highLimit=3000
app.get("/wars/between", async function(req, res) {
  const lowLimit = req.query.lowLimit
  const highLimit = req.query.highLimit

  var queryToMake = {}
  if (lowLimit){
    queryToMake.StartYear = {$gte: lowLimit}
  }
  if (highLimit){
    queryToMake.EndYear = {$ne:"", $lte: highLimit}
  } else {
    // excludes the wars with empty EndYear
    queryToMake.EndYear = {$ne:""}
  }
  console.log("lowLimit ", lowLimit, "highLimit", highLimit,"query ", queryToMake)
  const foundWars = await War.find(queryToMake)
  res.send(foundWars)
})

// GET war by name or part of a name  eg. /wars/name=hungarian
app.get("/wars/name=:name", async function(req, res) {
  const name = req.params.name
  console.log("name ", name)
  // Either "Common name" or "Name" has "name" in it
  const warsInRegion = await War.find({$or:[{"Common Name": {"$regex":name, "$options":"i"}}, {Name: {"$regex":name, "$options":"i"}}]})
  res.send(warsInRegion)
})

// GET war by region
app.get("/wars/region=:region", async function(req, res) {
  const region = req.params.region
  console.log("reg ", region)
  const warsInRegion = await War.find({Region: region})
  res.send(warsInRegion)
})

// GET war by EXACT start year
app.get("/wars/startYear=:startYear", async function(req, res) {
  const startYear = req.params.startYear
  console.log("startYear ", startYear)
  const warsStarted = await War.find({StartYear: startYear})
  res.send(warsStarted)
})


// CREATE new war. Give the new war in json format with all the required fields
app.post("/wars", function(req, res) {
  War.create(req.body)
      .then(function(newWar) {
        res.json(newWar)
        console.log("New war added!")
      })
      .catch(function(err) {
        res.json(err)
      })
})

//DELETE a war. Give _id value of the to-be-deleted war.
app.delete("/wars", function(req, res) {
  const idToDelete = req.body._id
  console.log(idToDelete)
  War.findOneAndRemove({_id: idToDelete})
      .then(function(deletedWar) {
        res.json(deletedWar)
        console.log("War deleted!")
      })
      .catch(function(err) {
        res.json(err)
      })
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})