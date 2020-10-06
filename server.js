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

const cors = require('cors')

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}) )
app.use(cors())

// Routes

// GET war by different parameters, eg. /wars?warStarted=1900&warEnded=1905&numberActors=8
// if no parameters are given, GET all wars
app.get("/wars", async function(req, res) {
  // Create query for the database depending which fields are present (excluded: countrycode, century, decade)
  let queryToMake = {}


  // 1) THE EXACT QUERIES
  // Either "Common name" or "Name" has "name" in it
  if (req.query.name){
    queryToMake = {$or:[{"Common Name": {"$regex":req.query.name, "$options":"i"}}, {Name: {"$regex":req.query.name, "$options":"i"}}]}
  }
  if (req.query.numberActors){
    queryToMake.NumberActors = req.query.numberActors
  }
  if (req.query.totalFatalities){
    queryToMake.TotalFatalities = req.query.totalFatalities
  }
  if (req.query.milFatalities){
    queryToMake.MilFatalities = req.query.milFatalities
  }
  if (req.query.startDay){
    queryToMake.StartDay = req.query.startDay
  }
  if (req.query.startMonth){
    queryToMake.StartMonth = req.query.startMonth
  }
  if (req.query.startYear){
    queryToMake.StartYear = req.query.startYear
  }
  if (req.query.endDay){
    queryToMake.EndDay = req.query.endDay
  }
  if (req.query.endMonth){
    queryToMake.EndMonth = req.query.endMonth
  }
  if (req.query.endYear){
    queryToMake.EndYear = req.query.endYear
  }
  if (req.query.region){
    queryToMake.Region = req.query.region
  }
  if (req.query.durationD){
    queryToMake.DurationD = req.query.durationD
  }
  if (req.query.durationM){
    queryToMake.DurationM = req.query.durationM
  }
  if (req.query.durationY){
    queryToMake.DurationY = req.query.durationY
  }

  // 2) THE RANGE QUERIES

  // Number of actors more or less than X (or equal to X)
  if (req.query.numberActorsMore) {
    queryToMake.NumberActors = {$gte: parseInt(req.query.numberActorsMore)}
  }
  if (req.query.numberActorsLess) {
    queryToMake.NumberActors = {$ne:"", $lte: parseInt(req.query.numberActorsLess)}
  }
  // Military fatalities more or less than X (or equal to X)
  if (req.query.milFatalitiesMore) {
    queryToMake.TotalFatalities = {$gte: parseInt(req.query.milFatalitiesMore)}
  }
  if (req.query.milFatalitiesLess) {
    queryToMake.TotalFatalities = {$ne:"", $lte: parseInt(req.query.milFatalitiesLess)}
  }
  // Fatalities more or less than X (or equal to X)
  if (req.query.fatalitiesMore) {
    queryToMake.MilFatalities = {$gte: parseInt(req.query.fatalitiesMore)}
  }
  if (req.query.fatalitiesLess) {
    queryToMake.MilFatalities = {$ne:"", $lte: parseInt(req.query.fatalitiesLess)}
  }
  // Length of the war in years (less or more than X years (or equal to X))
  if (req.query.durationLess){
    queryToMake.DurationY = {$ne:"", $lte: parseInt(req.query.durationLess)}
  }
  if (req.query.durationMore){
    queryToMake.DurationY = {$gte: parseInt(req.query.durationMore)}
  }
  // WarStarted: War started on that year or later. WarEnded: War ended on that year or earlier
  if (req.query.warStarted){
    queryToMake.StartYear = {$gte: parseInt(req.query.warStarted)}
  }
  if (req.query.warEnded){
    queryToMake.EndYear = {$ne:"", $lte: parseInt(req.query.warEnded)}
  }


  console.log("query ", queryToMake)
  // Make the search with queryToMake
  const foundWars = await War.find(queryToMake)
  res.status(200).json(foundWars)
})

// // GET war by region (OTHER WAY)
// app.get("/wars/regions/:region", async function(req, res) {
//   const region = req.params.region
//   console.log("reg ", region)
//   const warsInRegion = await War.find({Region: region})
//   res.send(warsInRegion)
// })

// CREATE new war. Give the new war in json format with all the required fields
app.post("/wars", function(req, res) {
  console.log(req.body.query)
  War.create(req.body)
      .then(function(newWar) {
        res.status(201).json(newWar)
        console.log("New war added!")
      })
      .catch(function() {
        res.status(400).json({ error: 'Error! Remember to add all the required fields: Name, StartYear, EndYear and Region' });
      })
})

// UPDATE a war. Send updatable data with json including the _id
app.put("/wars", function(req, res) {
  const id = req.body._id
  War.findByIdAndUpdate(id, req.body, {new: true}, function(err, updatedWar) {
    if (err) {
      res.status(400).json({ error: 'Error! Remember to give Id of the war to update and all the fields to be updated' });
    } else {
      res.status(200).json(updatedWar)
    }
  })
})

//DELETE a war. Give _id value of the to-be-deleted war.
app.delete("/wars", function(req, res) {
  const id = req.body._id
  War.findByIdAndRemove(id, function(err, deletedWar) {
    if (err){
      res.status(400).json({ error: 'Error! Remember to give Id to delete' });
    } else {
      res.status(200).json(deletedWar)
    }
  })
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})