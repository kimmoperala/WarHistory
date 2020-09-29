const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WarSchema = new Schema({
  CommonName: {
    type: String
  },
  Name: {
    type: String,
    required: true
  },
  CountryCode: {
    type: String
  },
  NumberActors: {
    type: String
  },
  MilFatalities: {
    type: String
  },
  TotalFatalities: {
    type: String
  },
  StartYear: {
    type: String,
    required: true
  },
  StartMonth: {
    type: String
  },
  StartDay: {
    type: String
  },
  EndYear: {
    type: String,
    required: true
  },
  EndMonth: {
    type: String
  },
  EndDay: {
    type: String
  },
  Region: {
    type: String,
    required: true
  },
  Century: {
    type: String
  },
  Decade: {
    type: String
  },
  DurationD: {
    type: String
  },
  DurationM: {
    type: String
  },
  DurationY: {
    type: String
  }
}, {collection: 'Wars'})

module.exports = mongoose.model('War', WarSchema)