const mongoose = require('mongoose')

const OptionSchema = new mongoose.Schema({
  position: {
    type: Number,
    require: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  values: {
    type: [String],
    required: true
  }
})

module.exports = mongoose.model('Option', OptionSchema)
