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
// if no parameters, GET all wars
app.get("/wars", async function(req, res) {
  // Create query for the database depending which fields are present (excluded: countrycode, milfatalities, century, decade)
  var queryToMake = {}

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

  // The EXACT duration
  if (req.query.durationD){
    queryToMake.DurationD = req.query.durationD
  }
  if (req.query.durationM){
    queryToMake.DurationM = req.query.durationM
  }
  if (req.query.durationY){
    queryToMake.DurationY = req.query.durationY
  }

  // Length of the war in years
  if (req.query.durationLess){
    queryToMake.DurationY = {$ne:"", $lte: req.query.durationLess}
  }

  // EI TOIMI!
  // if (req.query.durationMore){
  //   queryToMake.DurationY = {$gte: req.query.durationMore}
  // }

  // War started on that year or later
  if (req.query.warStarted){
    queryToMake.StartYear = {$gte: req.query.warStarted}
  }
  // War ended on that year or earlier
  if (req.query.warEnded){
    queryToMake.EndYear = {$ne:"", $lte: req.query.warEnded}
  }
  console.log("query ", queryToMake)
  // Returns
  const foundWars = await War.find(queryToMake)
  res.send(foundWars)
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
  War.create(req.body)
      .then(function(newWar) {
        res.json(newWar)
        console.log("New war added!")
      })
      .catch(function(err) {
        res.json(err)
      })
})

// UPDATE a war. Send updatable data with json including the _id
app.put("/wars", function(req, res) {
  const id = req.body._id
  War.findByIdAndUpdate(id, req.body, {new: true}, function(err, updatedWar) {
    if (err) {
      res.json(err)
    } else {
      res.json(updatedWar)
    }
  })
})

//DELETE a war. Give _id value of the to-be-deleted war.
app.delete("/wars", function(req, res) {
  const id = req.body._id
  War.findByIdAndRemove(id, function(err, deletedWar) {
    if (err){
      res.json(err)
    } else {
      res.json(deletedWar)
    }
  })
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})