const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const passport = require('passport')

// Load input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')

// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //  Size
        r: 'pg', //  Rating
        d: 'mm' //  default
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
        role: '2'
      })

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route  POST api/users/login
// @desc   Login user
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find User by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        errors.password = 'Incorrect Password'
        return res.status(400).json(errors)
      } else {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role
        }

        // Sign Token
        jwt.sign(
          payload,
          process.env.SECRET_OR_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              console.log(err)
            }
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      }
    })
  })
})

// @route  GET api/users/writers/
// @desc   GET writers
// @access Private
router.get(
  '/writers/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      // Check if the user is an admin
      if (user.role !== '0') {
        return res.status(401).json({ notauthorized: 'User not authorized' })
      } else {
        User.find({ role: '1' })
          .select('name')
          .sort({ date: -1 })
          .then(writers => {
            res.json(writers)
          })
          .catch(err => console.log(err))
      }
    })
  }
)

// @route  POST api/users/add-writer/
// @desc   Add writer using email
// @access Private
router.post(
  '/add-writer/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {}
    User.findById(req.user.id).then(user => {
      // Check if the user is an admin
      if (user.role !== '0') {
        return res.status(401).json({ notauthorized: 'User not authorized' })
      } else {
        User.findOne({ email: req.body.email })
          .then(user => {
            if (!user) {
              errors.email = 'User not found'
              return res.status(404).json(errors)
            }
            if (user.role === `1`) {
              errors.email = 'User is already a writer'
              return res.status(404).json(errors)
            }
            user.role = '1'
            user
              .save()
              .then(user =>
                res.json({
                  _id: user._id,
                  name: user.name
                })
              )
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => console.log(err))
      }
    })
  }
)

// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    })
  }
)

module.exports = router
