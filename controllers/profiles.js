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
  console.log('Delete List',req.params);
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


  function addToList(req, res) {
    console.log(req.body);
    Profile.findById(req.params.id)
    .then(profile => {
      profile.lists.forEach(list => {
        if (list._id == req.body.id) {
          list.businesses.indexOf(req.body.business) === -1 ? list.businesses.push(req.body.business) : console.log("This item already exists");
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
    Profile.findById(req.params.id)
    .then(profile => {
      profile.lists.forEach(list => {
        if (list._id == req.body.list._id) {
          console.log(list.businesses);
          console.log(req.body.business._id);
          list.businesses = list.businesses.remove(req.body.business._id)
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
