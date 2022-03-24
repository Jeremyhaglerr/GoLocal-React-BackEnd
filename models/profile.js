import mongoose from 'mongoose'

const listschema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  description: {
    type: String
  },
  businesses: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Business"
  }]
})

const profileSchema = new mongoose.Schema({
  email: {
    type: String, required: true, 
    lowercase: true, unique: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  bio: {
    type: String
  },
  city: {
    type: String
  },
  businesses: [{
    type: mongoose.Schema.Types.ObjectId,ref: "Business"
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Review"
  }],
  lists: [listschema]
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
 