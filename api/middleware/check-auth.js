const jwt = require('jsonwebtoken')


module.exports = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1]
        // console.log("your token " + token)
        const decode = await jwt.verify(token, process.env.JWT_SECRET, null)
        req.userData =  decode;
        next()
}
    catch(error) {
        return res.status(401).json({
            message: "Authentication failed"
        })
    }
    
}