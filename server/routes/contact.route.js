var express = require('express');
var router = express.Router();
var Contact = require('../models/contact.model');

router.route('/contact')
	.post((req,res) => {
		var newContactApplication = new Contact({
			subject: req.body.subject,
			content: req.body.content,
			authorEmail: req.body.authorEmail,
			authorName: req.body.authorName,
			authorSurname: req.body.authorSurname
		});
		// save
		newContactApplication.save((err) => {
			if (err){
				return res.status(409).json({message: 'Wrong game'});
			} else {
				return res.status(201).json(newContactApplication);
			}
		});
	});

module.exports = router;
