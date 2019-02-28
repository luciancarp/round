const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load input Validation
const validateIssueInput = require('../../validation/issue')

// Load User model
const Issue = require('../../models/Issue')

// @route  POST api/posts
// @desc   Create post
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
    const newIssue = new Issue({
      name: req.body.name,
      description: req.body.description,
      avatar: req.body.avatar,
      user: req.user.id
    })

    newIssue.save().then(post => res.json(post))
  }
)

// @route  GET api/issues/test
// @desc   Tests issues route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Issues Works' }))

module.exports = router
