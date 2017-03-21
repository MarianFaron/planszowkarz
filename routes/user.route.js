var express = require('express');        
var router = express.Router();
var User = require('../models/user.model');

router.route('/users')
	// get all users
	.get(function(req,res){
		User.find(function(err,users){
			if(err){
				return res.status(400).json({message: "Bad Requested"});
			}else{
				return res.status(200).json({users: users});
			}
		});
	})
	// post new user
	.post(function(req,res){
		if (!req.body.login || !req.body.password) {
			return res.status(401).end({message: "You must pass login/password"});
		} else {
			var newUser = new User({
			   login: req.body.login,
			   password: req.body.password,
			   nameame: req.body.name,
			   email: req.body.email
			});
			// save the user
			newUser.save(function(err) {
				if (err){
					return res.status(409).json({ message: 'Wrong user'});	
				} else {
					return res.status(201).json(newUser);
				}
			});
		}
	});

module.exports = router;