var express = require('express');
var router = express.Router();
var multer = require('multer');
var rootUrl = 'localhost:8080';


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../dist/assets/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage }).single('photo');

router.route('/uploads')
  .post(function(req, res, next) {
   var path = '';
   upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(422).send("an Error occured")
      }
      path = req.file.path;
  });
})

module.exports = router;
