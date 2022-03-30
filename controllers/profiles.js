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
  .populate('lists.businesses')
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
  console.log(req.body);
  Profile.findById(req.params.id)
  .then(profile => {
    profile.lists.remove(req.body.list)
      profile.save()
      .then(profile => 
        res.status(200).json(profile))
    
      .catch(err => 
        res.status(500).json(err))
      })
  }

  function addToList(req, res) {
    console.log(req.body);
    Profile.findById(req.params.id)
    .then(profile => {
      profile.lists.forEach(list => {
        if (list._id == req.body.id) {
          list.businesses.push(req.body.business)
        }
      })
      profile.save()
      .then(profile => 
        res.status(200).json(profile))
    
      .catch(err => 
        res.status(500).json(err))
    })
  }

  function removeFromList(req, res) {
    console.log("req.body",req.body);
    Profile.findById(req.params.id)
    .then(profile => {
      profile.lists.forEach(list => {
        if (list._id == req.body.id) {
          console.log(list.businesses);
          // list.businesses = list.businesses.filter(business => business._id === req.body.business)
        }
      })
      profile.save()
      .then(profile => 
        res.status(200).json(profile))
    
      .catch(err => 
        res.status(500).json(err))
    })
  }

export { index, show, addList, deleteList, addToList, removeFromList };
