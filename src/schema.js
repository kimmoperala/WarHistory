const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Select the collection to use! (TestiSodat for testing, Sodat for the actual use)
const collection = "Sodat"

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
    type: Number
  },
  MilFatalities: {
    type: Number
  },
  TotalFatalities: {
    type: Number
  },
  StartYear: {
    type: Number,
    required: true
  },
  StartMonth: {
    type: Number
  },
  StartDay: {
    type: Number
  },
  EndYear: {
    type: Number,
    required: true
  },
  EndMonth: {
    type: Number
  },
  EndDay: {
    type: Number
  },
  Region: {
    type: Number,
    required: true
  },
  Century: {
    type: Number
  },
  Decade: {
    type: Number
  },
  DurationD: {
    type: Number
  },
  DurationM: {
    type: Number
  },
  DurationY: {
    type: Number
  }
}, {collection: collection}, {versionKey: false})

module.exports = mongoose.model('War', WarSchema)