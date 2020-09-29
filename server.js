const express = require ('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')

const War = require('./src/schema')

require('dotenv').config()
const uri = process.env.REACT_APP_DB_CONNECTION

mongoose.connect(uri, {useUnifiedTopology: true})

War.find({}).then(result => {
  console.log(result)
  result.forEach(war => {
    console.log(war)
  })
  mongoose.connection.close()
})
    //
    // .then(client => {
    //   console.log('Connected to Database now')
    //   const db = client.db('WarHistory')
    //   app.get('/', (req, res) => {
    //     db.collection('Wars').find().toArray()
    //         .then(results => {
    //         console.log(results)
    //         })
    //         .catch(error => console.error(error))
    //   })
    //   app.get('/year', (req, res) => {
    //     db.collection('Wars').find({StartYear:"2000"}).toArray()
    //         .then(results => {
    //         console.log(results)
    //         })
    //         .catch(error => console.error(error))
    //   })
    // })
    // .catch(error => console.error(error))

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})