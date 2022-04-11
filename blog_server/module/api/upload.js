const multer = require('multer');
const path = require("path");
const imgUrl = path.resolve(__dirname, "../../static/img");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imgUrl);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + parseInt(30 + Math.random() * 100, 26) + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage
})
module.exports = upload;