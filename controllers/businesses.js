import { Business } from "../models/business.js"

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

export {
  index
}