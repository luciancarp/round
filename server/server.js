const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
require('dotenv').config()

const users = require('./routes/api/users')
const issues = require('./routes/api/issues')
const articles = require('./routes/api/articles')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB Config
const db = process.env.MONGO_URI

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(Error(err)))

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)
// app.get('/', (req, res) => res.send('Hello!'));

// Use Routes
app.use('/api/users', users)
app.use('/api/issues', issues)
app.use('/api/articles', articles)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
