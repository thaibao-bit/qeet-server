const router = require('express').Router()
const qeetModel = require('../models/qeet')
const userModel = require('../models/user')
const checkAuth = require('../middleware/check-auth')

router.get('/', (request, response, next) => {
    const data = qeetModel.find()
    return response.status(200).json({data})
    return response.status(200).json({message: "Alo"})
})

module.exports = router