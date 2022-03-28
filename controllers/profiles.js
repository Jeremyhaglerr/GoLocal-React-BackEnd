import { Profile } from "../models/profile.js";

function index(req, res) {
  Profile.find({})
    .then((profiles) => res.json(profiles))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function show(req, res) {
  Profile.findById(req.params.id)
    .then((profile) => res.json(profile))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function addList(req, res) {
  Profile.findById(req.params.id, function(err, profile) {
    profile.lists.push(req.body) 
      profile.save()
      .then(profile => 
        res.status(200).json(profile))
    
      .catch(err => 
        res.status(500).json(err))
  })
}

function deleteList(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.lists.remove(req.params.listId)
      profile.save()
      .then(profile => 
        res.status(200).json(profile))
    
      .catch(err => 
        res.status(500).json(err))
      })
  }

export { index, show, addList, deleteList };
