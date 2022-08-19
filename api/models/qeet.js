const mongoose = require("mongoose")

const qeetSchema = mongoose.Schema({
    
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    userName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: false
    },
    // created: {
    //     type: Date,
    //     default: Date.now
    // },
    // answers: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "AnswerQeet"
    // },
    // reQeets: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "ReQeet"
    // },
    // shares: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
    // likes: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
    
})

module.exports = mongoose.model("Qeet", qeetSchema)