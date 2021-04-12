const mongoose = require('mongoose')

const ConfigSchema = new mongoose.Schema({
  jsonConfig: {
    type: String,
    required: true
  },
  validDate: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Config', ConfigSchema)
