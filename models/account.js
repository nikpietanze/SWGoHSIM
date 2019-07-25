let mongoose = require('mongoose');

// Account Schema
const accountSchema = mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  displayName:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  playerID:{
    type: String,
    required: true
  },
  agreement:{
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Account', accountSchema);