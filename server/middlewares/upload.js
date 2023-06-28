const multer = require('multer')
const path = require('path');

var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now()+ext)
    }
})


var uploads = multer ({storage})

module.exports = uploads
