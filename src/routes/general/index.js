const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: './images',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype.includes('image') ||
      file.mimetype.includes('application')
    ) {
      cb(null, true);
    } else {
      cb('Please Upload an Valid File', false);
    }
  },
});

router.post('/single', upload.single('image'), async (req, res) => {
  try {
    let fileType = req.file.mimetype.split('/')[0];

    res.send({file: req.file.path.replace('\\', '/'), fileType});
  } catch (err) {
    res
      .status(500)
      .send(err.message ? {messages: [{message: err.message}]} : err);
  }
});

module.exports = router;
