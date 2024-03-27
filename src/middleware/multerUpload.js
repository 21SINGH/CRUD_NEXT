const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./pdfs"); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for storage
  },
});

const upload = multer({ storage: storage });


const multerUpload = (req, res, next) => {
    
}