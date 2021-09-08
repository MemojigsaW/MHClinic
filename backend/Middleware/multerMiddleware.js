const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
require('dotenv').config();

const storageEng = new GridFsStorage({
    url: process.env.DB_CONNECTION,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        return {
            bucketName: "Avatar",
            filename: file.originalname
        }
    }
});

function fileFilter(req, file, cb) {
    const fileSize = parseInt(req.headers['content-length']);

    if (!(file.mimetype === "image/jpg" || file.mimetype === "image/png")) {
        req.multerError = 'Must be png, jpg';
        return cb(null, false);
    }
    if (fileSize <= 1000000) {
        return cb(null, true);
    } else {
        req.multerError = 'File too Large';
        return cb(null, false);
    }
}


const avatarUpload = multer({
    storage: storageEng,
    fileFilter: fileFilter
});

module.exports = avatarUpload;