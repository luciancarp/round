const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const IssueSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

let Issue = mongoose.model('issues', IssueSchema)

module.exports = Issue
