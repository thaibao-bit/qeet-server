const router = require('express').Router()
const qeetModel = require('../models/qeet')
const userModel = require('../models/user')
const checkAuth = require('../middleware/check-auth')
const upload = require('../middleware/upload-video')
const user = require('../models/user')

router.get('/', async (request, response, next) => {
    const data = await qeetModel.find({} )
    console.log(data)
    return response.status(200).json(data)
})

router.post('/',checkAuth, upload.single("media") , async (request, response, next) => {
    const user = await userModel.findById({_id: request.userData.id}) 
    const mediaFile = request.file.path
    console.log(mediaFile)
    if (!user) {
        return response.status(404).json({
            message: "Stop hacking me"
        })
    }
    
    const qeet = await new qeetModel({
        user: {
            userId: user._id,
            userName: user.userName,
            profilePic: user.profilePic
        },
        text: request.body.text,
        media: mediaFile

    })
    await user.qeets.push(qeet._id)
    qeet.save()
    user.save()

    return response.status(201).json({
        created: qeet
    })
})

router.post('/like-toggle/:id', checkAuth, async (request, response, next) => {
    const qeet = await qeetModel.findById({_id: request.params.id})
    const user = await userModel.findById({_id:request.userData.id})
    const liked = await user.liked.filter((id) => {return id == qeet._id})
    if(liked == "") {
        user.liked.push(qeet._id)
        await user.save()
        return response.status(200).json(user)
    }
    user.liked = await user.liked.filter((id)=> {return id != qeet._id})
    await user.save()
    // console.log( user.liked.filter(CheckId))
    // console.log(user)
    return response.status(200).json({
        message: "Remove xong roi",
        user
    })
    
})


module.exports = router