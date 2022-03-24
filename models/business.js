import mongoose from 'mongoose'

const Schema = mongoose.Schema 

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },

    owner: 
        {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
    
    })

const businessSchema = new Schema ({
    name: {
    type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    },
    url: {
        type: String,
    }, 
    phoneNum: {
        type: String, 
        required: true
    },
    hours: {
        type: Array
    },
    image: {
        type: String
    },
    owner: { 
        type: Schema.Types.ObjectId, ref: "Profile"
    },
    reviews: [reviewSchema],
    coupon: {
        type: Array
    }
})

const Business = mongoose.model('Business', businessSchema)

export {
    Business
}