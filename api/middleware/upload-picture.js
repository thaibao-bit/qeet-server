const multer = require('multer')


const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") 
    {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./uploads/')
    },
    filename: (req,file,cb) => {
        cb(null, req.userData.id  + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
})
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 *1024 *5
    }
})

module.exports = upload