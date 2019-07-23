const express = require("express");
const router = express.Router();
const path = require("path");

const multer = require("multer");

//Create Storage for file upload
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
//Multer Upload Function
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("filename");

function checkFileType(file, cb) {
  //Allowed extension
  const filetypes = /jpeg|jpg|png|gif/;
  //Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Unsupported file type");
  }
}

router.post("/", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(400).json({
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.status(400).json({
          msg: "Please choose a file"
        });
      } else {
        res.status(200).json({
          msg: "File upload succeed"
        });
      }
    }
  });
});

module.exports = router;
