const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load input Validation
const validateArticleInput = require('../../validation/article')

// Load User model
const Issue = require('../../models/Issue')
const User = require('../../models/User')
const Article = require('../../models/Article')

// @route  POST api/articles
// @desc   Create article
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateArticleInput(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    User.findById(req.user.id).then(user => {
      // Check if the user is an admin
      if (user.role !== '0' && user.role !== '1') {
        return res.status(401).json({ notauthorized: 'User not authorized' })
      } else {
        Issue.findById(req.body.issue).then(issue => {
          if (!issue) {
            errors.issue = 'issue not found'
            return res.status(404).json(errors)
          }

          const newArticle = new Article({
            name: req.body.name,
            text: req.body.text,
            topic: req.body.topic,
            avatar: req.body.avatar,
            user: req.user.id,
            issue: req.body.issue
          })

          newArticle.save().then(article => res.json(article))
        })
      }
    })
  }
)

// @route  GET api/articles
// @desc   Get articles
// @access Public
router.get('/', (req, res) => {
  Article.find()
    .populate({
      path: 'user',
      select: 'name'
    })
    .sort({ date: -1 })
    .then(articles => res.json(articles))
    .catch(err => console.log(err))
})

// @route  GET api/articles/:id
// @desc   Get article by id
// @access Public
router.get('/:id', (req, res) => {
  Article.findById(req.params.id)
    .then(article => {
      if (!article) {
        res.status(404).json({ noarticlefound: 'No article found with that ID' })
      }
      res.json(article)
    })
    .catch(err => console.log(err))
})

// @route  GET api/articles/from-issue/:id
// @desc   GET Articles from issue id
// @access Public
router.get(
  '/from-issue/:id', (req, res) => {
    Article.find({ issue: req.params.id })
      .populate({
        path: 'user',
        select: 'name'
      })
      .populate({
        path: 'issue',
        select: 'name'
      })
      .sort({ date: -1 })
      .then(articles => {
        res.json(articles)
      })
      .catch(err => console.log(err))
  }
)

// @route  GET api/articles/test
// @desc   Tests articles route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Articles Works' }))

module.exports = router
