const multer = require('multer')


const fileFilter = (req, file, cb) => {
    if (file.mimetype === "video/3gpp" || file.mimetype === "video/x-msvideo" || file.mimetype === "video/mp4") 
    {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./uploads/videos/')
    },
    filename: (req,file,cb) => {
        cb(null, req.userData.id  + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
})
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = upload