const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load input Validation
const validateIssueInput = require('../../validation/issue')

// Load User model
const Issue = require('../../models/Issue')
const User = require('../../models/User')

// @route  POST api/issues
// @desc   Create issue
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateIssueInput(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    User.findById(req.user.id).then(user => {
      // Check if the user is an admin
      if (user.role !== '0') {
        return res.status(401).json({ notauthorized: 'User not authorized' })
      } else {
        const newIssue = new Issue({
          name: req.body.name,
          description: req.body.description,
          avatar: req.user.avatar,
          user: req.user.id
        })

        newIssue.save().then(issue => res.json(issue))
      }
    })
  }
)

// @route  GET api/issues
// @desc   Get issues
// @access Public
router.get('/', (req, res) => {
  Issue.find()
    .sort({ date: -1 })
    .then(issues => res.json(issues))
    .catch(err => {
      console.log(err)
      res.status({ noissuesfound: 'No issues found' })
    })
})

// @route  GET api/issues/:id
// @desc   Get issue by id
// @access Public
router.get('/:id', (req, res) => {
  Issue.findById(req.params.id)
    .then(issue => res.json(issue))
    .catch(err => {
      console.log(err)
      res.status(404).json({ noissuefound: 'No issue found with that ID' })
    })
})

// @route  GET api/issues/test
// @desc   Tests issues route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Issues Works' }))

module.exports = router
