const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recordSchema = new Schema({
  originalUrl: {
    type: String
  },
  newUrl: {
    type: String
  }
})

module.exports = mongoose.model('Record', recordSchema)