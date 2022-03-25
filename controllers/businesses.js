
import { Business } from "../models/business.js"
import { v2 as cloudinary } from 'cloudinary'

function create(req, res) {
  console.log(req.body)
  req.body.owner = req.user.profile
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    Business.create(req.body)
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
      req.body.photo = image.url
      Business.create(req.body)
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

function deleteBusiness(req, res) {
  Business.findByIdAndDelete(req.params.id)
  .then(business => res.json(business))
  .catch(err => res.json(err))
}

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

function show(req, res) {
  Business.findById(req.params.id)
  .populate ('owner')  
  .then((profile) => res.json(profile))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
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

function addReview(req, res) {
  Business.findById(req.params.id, function(err, business) {
    business.reviews.push(req.body) 
          business.save()
          .then(business => 
            res.status(200).json(business))
        
          .catch(err => 
            res.status(500).json(err))
    })
  }

function deleteReview(req, res) {
  Business.findById(req.params.id)
  .then(business => {
    business.reviews.remove(req.params.reviewId)
      business.save()
      .then(business => 
        res.status(200).json(business))
    
      .catch(err => 
        res.status(500).json(err))
      })
  }

export {
  update,
  create,
  index,
  show,
  deleteBusiness as delete,
  addReview, 
  deleteReview
}