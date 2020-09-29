const express = require ('express')
const app = express()
const port = 3001
require('dotenv').config()

const uri = process.env.REACT_APP_DB_CONNECTION
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(uri, {
  useUnifiedTopology: true})
    .then(client => {
      console.log('Connected to Database now')
      const db = client.db('WarHistory')
      app.get('/', (req, res) => {
        db.collection('Wars').find().toArray()
            .then(results => {
            console.log(results)
            })
            .catch(error => console.error(error))
      })
      app.get('/year', (req, res) => {
        db.collection('Wars').find({StartYear:"2000"}).toArray()
            .then(results => {
            console.log(results)
            })
            .catch(error => console.error(error))
      })
    })
    .catch(error => console.error(error))

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})