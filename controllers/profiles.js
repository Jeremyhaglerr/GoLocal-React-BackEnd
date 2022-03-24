import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

const show = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('owner')
    return res.status(200).json(post)
  } catch (err) {
    return res.status(500).json(err)
  }
}


export {
  create,
  index,
  show,
}
