const multer = require('multer');

module.exports = upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
            // $ = end of name
            // i = case insensitive
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
});
