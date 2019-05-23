const uuid = require('uuid/v4')
const mime = require('mime-types')
const { Storage } = require('@google-cloud/storage')

const config = require('../config')

exports.create = async (req, res, next) => {
  // console.log(req.file.originalname)
  const type = mime.lookup(req.file.originalname)

  const storage = new Storage({
    projectId: config.google.projectId,
    keyFilename: './gcs.json'
  })

  const bucket = storage.bucket(config.google.bucket)
  const blob = bucket.file(`${uuid()}.${mime.extensions[type][0]}`)

  const stream = blob.createWriteStream({
    resumable: true,
    contentType: type,
    predefinedAcl: 'publicRead'
  })

  stream.on('error', err => {
    next(err)
  })

  stream.on('finish', () => {
    res.status(200).json({
      data: {
        url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      }
    })
  })

  stream.end(req.file.buffer)
}
