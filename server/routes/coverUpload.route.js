var express = require('express');
var router = express.Router();
var multer = require('multer');
var rootUrl = 'localhost:8080';

var storage_src = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../src/assets/uploads/covers')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var storage_dist = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../dist/assets/uploads/covers')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload_to_src = multer({ storage: storage_src }).single('photo');
var upload_to_dist = multer({ storage: storage_dist }).single('photo');

router.route('/coverUpload')
  .post(function(req, res, next) {
   var path = '';
   upload_to_src(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(422).send("an Error occured")
      }
      path = req.file.path;
  });
  upload_to_dist(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(422).send("an Error occured")
      }
      path = req.file.path;
  });
})

module.exports = router;
