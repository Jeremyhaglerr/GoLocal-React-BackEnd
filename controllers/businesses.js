import { Business } from "../models/business.js"
import { v2 as cloudinary } from 'cloudinary'

function index (req, res) {
  Business.find({})
  .populate('owner')
  .then(businesses => {
    res.json(businesses)
  })
  .catch(err => {
    res.json(err)
  })
}

function update (req, res) {
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    Business.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(business => {
      business.populate('owner')
      .then(populatedBusiness => {
        res.status(201).json(populatedBusiness)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  } else {
    const imageFile = req.files.photo.path
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      console.log(image)
      req.body.photo = image.url
      Business.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(business => {
        business.populate('owner')
        .then(populatedBusiness => {
          res.status(201).json(populatedBusiness)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
}

export {
  index,
  update
}