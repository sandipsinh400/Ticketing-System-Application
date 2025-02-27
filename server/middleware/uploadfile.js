const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "File") {
            cb(null, './upload')
        }

    },
    filename: (req, file, cb) => {
        if (file.fieldname === "File") {
            cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        }
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 50
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})
function checkFileType(file, cb) {
    if (file.fieldname === "File") {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/svg' || 
            file.mimetype === 'application/pdf'
        ) {
            cb(null, true);
        } 
        else {
            cb(null, false);
        }
    }
}

module.exports = upload;