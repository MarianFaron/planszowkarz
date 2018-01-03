var express = require('express');
var router = express.Router();
var Contact = require('../models/contact.model');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'planszowkarz@gmail.com',
	  pass: '123456789ABC'
	}
  });

router.route('/contact')
	.post((req,res) => {
		
		var newContactApplication = new Contact({
			subject: req.body.subject,
			content: req.body.content,
			authorEmail: req.body.authorEmail,
			authorName: req.body.authorName,
			authorSurname: req.body.authorSurname
		});

		mailOptions = {
			from: '"Planszówkarz" <planszowkarz@gmail.com>',
			to: 'planszowkarz@gmail.com',
			subject: 'Wiadomość z formularza kontaktowego',
			html: '<div style="background: #f5f5f5; padding-top: 40px;padding-bottom: 40px;"><div class="email" style="width: 500px; margin: 0 auto;border:1px solid #b6b6b6;"><div class="email-header" style="background:#f98d1a;text-align: center;color: #fff; padding: 5px;"><h4 style="margin 0;padding: 0;">Planszówkarz</h4></div><div class="email-content" style="padding: 15px; background: #fff;"><h3>Zgłoszenie z formularza kontaktowego</h3><p style="font-size: 14px;">Użytkownik: ' + newContactApplication.authorEmail + ', ' + newContactApplication.authorName + ' ' + newContactApplication.authorSurname + ' wysłał wiadomość</p><p style="font-size: 14px;"><b>Temat zgłoszenia: </b>' + newContactApplication.subject + ' </p><p style="font-size: 14px;"><b>Treść zgłoszenia: </b>' + newContactApplication.content + ' <p style="font-size: 14px;">Zgłoszenie zostało wysłane z formularza kontaktowego aplikacji Planszówkarz.</p></div><div class="email-footer" style="background:#f98d1a;text-align: center;color: #fff; padding: 15px; font-size: 12px">Planszówkarz 2017 <a href="#" style="color: #fff">Kontakt</a></div></div></div>'
		  };

		// save
		newContactApplication.save((err) => {
			if (err){
				return res.status(409).json({message: 'Wrong game'});
			} else {
				return res.status(201).json(newContactApplication);
			}
		});

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
			  return console.log(error);
			}
		  });

	});

module.exports = router;
