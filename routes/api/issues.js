const express = require('express')
const router = express.Router()
const passport = require('passport')
const uuid = require('uuid/v4')
const Multer = require('multer')

const { Storage } = require('@google-cloud/storage')
const config = require('../../config')

const Upload = require('../../utils/upload')

// Load input Validation
const validateIssueInput = require('../../validation/issue')

// Load User model
const Issue = require('../../models/Issue')
const User = require('../../models/User')
const Article = require('../../models/Article')

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
})

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
          user: req.user.id,
          cover: req.body.cover
        })

        newIssue.save().then(issue => res.json(issue))
      }
    })
  }
)

// @route  DELETE api/issues/:id
// @desc   Delete issue
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (user.role !== '0') {
        return res.status(401).json({ notauthorized: 'User not authorized' })
      }

      Issue.findById(req.params.id).then(issue => {
        Article.deleteMany({ issue: issue._id })
          .then(res => {
            const storage = new Storage({
              projectId: config.google.projectId,
              keyFilename: './gcs.json'
            })

            // const bucket = storage.bucket(config.google.bucket)
            const splitCoverUrl = issue.cover.split('/')
            const fileName = splitCoverUrl[splitCoverUrl.length - 1]

            storage
              .bucket(config.google.bucket)
              .file(fileName)
              .delete()
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
        issue
          .remove()
          .then(() => res.json({ success: true }))
          .catch(err =>
            res.status(404).json({ issuenotfound: 'No issue found' })
          )
      })
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

// @route  POST api/issues/upload-image
// @desc   Upload issue image to GCS
// @access Private
router.post(
  '/upload-image',
  passport.authenticate('jwt', { session: false }),
  multer.single('image'),
  Upload.create,
  (req, res) => {}
)

// @route  GET api/issues/test
// @desc   Tests issues route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Issues Works' }))

module.exports = router
