const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9]{5,20}$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    profilePic:{
        type: String,
        required: false,
        default: "https://res.cloudinary.com/dwzsk5h9e/image/upload/v1660285255/samples/people/boy-snow-hoodie.jpg"
    },
    backgroundPic: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false,
        default: "Welcome to my Qitter page."
    },
    webSite:{
        type: String,
        required: false,
        default: ""
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    qeets: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Qeet"
    },
    liked: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Qeet"
    },
    shared: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Qeet"
    },
    reQeeted: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Qeet"
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User"
    },
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User"
    }

})

module.exports = mongoose.model('User', userSchema)