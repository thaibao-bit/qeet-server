const router = require('express').Router()
const bcrypt = require('bcrypt')
const JWT = require("jsonwebtoken")
const checkAuth = require('../middleware/check-auth')
const userModel = require('../models/user')
const upload = require('../middleware/upload-picture')

router.post('/register', (request, response, next) => { 
        const userName = request.body.userName
        const email = request.body.email
        const password = request.body.password
        if (!userName){
            return response.status(400).json({
                message: "Please fill your userName"
            })
        }
        if (!email){
            return response.status(400).json({
                message: "Please fill your email"
            })
        }
        if (!password){
            return response.status(400).json({
                message: "Please fill your password"
            })
        }
        userModel.find({ $or : [{userName}, {email}]}).exec().then(user => {
            if(user.length >= 1){
                return response.status(400).json(
                    {
                        message: "This email or userName is already taken"
                    }
                )
            }

        bcrypt.hash(password, 10, (error, encrypted) => {
            if (error){
                return response.status(500).json({
                    message: "Encrypting Error",
                    error: error
                })
            }
            if (encrypted){
                const user = new userModel({
                    email,
                    userName,
                    password: encrypted
                })   
                user.save().then(result => {

                    JWT.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"}, (error, encoded) => {
                        if(error){
                            return response.status(500).json({
                                message: "error",
                                error: error

                            })

                        }

                        return response.status(201).json({
                            message: "Success",
                            token: encoded,
                            userInfo: user,
                            result
                        })
                    })

                   
                })
                .catch(error => {
                    return response.status(400).json({
                        message: "Pls make sure there's no white space or special char",
                        error
                    })
                }) 
            }
        })
})
})

router.post('/login', (request, response, next) => {
    const userName = request.body.userName
    const password = request.body.password
    if (!userName){
        return response.status(400).json({
            message: "Please fill your userName"
        })
    }
    if (!password){
        return response.status(400).json({
            message: "Please fill your password"
        })
    }

    userModel.findOne({userName}).exec()
    .then(user => {
        if(!user){
            return response.status(401).json({
                message: "Authentication Failed"
            })
        }
        bcrypt.compare(password, user.password, (error, same) => {
            if(error){
                return response.status(400).json({
                    message: "Password or username doesn't match"
                })
            }
            if (same){
                JWT.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "12h"}, (error, encoded) => {
                    if(error){
                        return response.status(500).json({
                            message: "Something went wrong, please try again",
                            error: error
                        })
                    }
                    if (encoded){
                        return response.status(200).json({
                            message: "Success",
                            token: encoded
                        })
                    }
                })
            }
        })
    })
})

router.patch('/update', checkAuth, upload.fields([{name: 'profilePic', maxCount: 1}, {name:'backgroundPic', maxCount: 1}]), (request, response, next) => {
    const userId = request.userData.id
    console.log(request.files.profilePic[0].path)
    userModel.findOneAndUpdate({userId}, {
        bio: request.body.bio,
        webSite: request.body.webSite,
        dateOfBirth: request.body.dateOfBirth,
        profilePic: request.files.profilePic[0].path,
        backgroundPic: request.files.backgroundPic[0].path
    } , null, (error, result) => {
        if(error){
            return response.status(400).json({
                error
            })
        }
        if(result){
            return response.status(200).json({
            message: "Updated"
            })
        }
        else{
            return response.status(400).json({
                message: "???????"
                })
        }
    })
})

router.post('/follow-toggle/:id', checkAuth, async (request, response, next) => {
    const followedUser = await userModel.findById({_id: request.params.id})
    const user = await userModel.findById({_id:request.userData.id})
    const followed = await user.following.filter((id) => {return id == followedUser._id})
    if(followed == "") {
        user.following.push(followedUser._id)
        // followedUser.followers.push(user._id)
        // await followedUser.save()
        await user.save()
        return response.status(200).json(user)
    }
    user.following = await user.following.filter((id)=> {return id != followedUser._id})
    // followedUser.followers = await followedUser.followers.filter((id)=> {return id != user._id})
    // await followedUser.save()
    await user.save()
    return response.status(200).json({
        message: "Unfollowed",
        user
    })
    
})

module.exports = router