const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, "uploads/")
    },

    filename: function(req, file, next) {
        next(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploader = multer({storage: storage});

module.exports = uploader