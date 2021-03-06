import path from "path";
import express, { Router } from "express";
import multer from "multer";
const router = express.Router();

// configuration storage for uploaded files
const storage = multer.diskStorage({
  destination(req, file, cd) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// function for validating filetypes
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Please upload image file (jpg or png");
  }
}

// uploading

const upload = multer({
  storage,
  filefilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// route for uploads
router.post("/", upload.single("image"), (req, res) => {
  res.send(`${req.file.path}`);
});

export default router;
