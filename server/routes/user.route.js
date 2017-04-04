var express = require('express');
var router = express.Router();
var User = require('../models/user.model');

router.route('/users')
	// get all users
	.get((req,res) => {
		User.find((err,users) => {
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
					return res.status(409).json({message: 'Wrong user'});
				} else {
					return res.status(201).json(newUser);
				}
			});
		}
	});

router.route('/users/:id')
	.get(function(req, res){
		User.findById(req.params.id, function(err, user) {
			if(err){
				return res.status(400).json({message: "Bad Requested"});
			} else if(!user){
				return res.status(404).json({message: "User not Found"});
			} else {
				return res.status(200).json(user);
			}
		});
	})

	.patch(function(req, res){
		if(!req.body.password){
			return res.status(401).json({ message: "You haven't entered a password."});
		}

		User.findByIdAndUpdate({_id: req.params.id}, req.body, function(err, user) {
			if(err){
				return res.status(400).json({message: "Bad Requested"});
			} else if(!user){
				return res.status(404).json({message: "User not Found"});
			} else {
				return res.status(200).json({user});
			}
		});
	})

	.delete(function(req, res){
		User.findById(req.params.id, function(err, user) {
			if(err){
				return res.status(400).json({message: "Bad Requested"});
			} else if(!user){
				return res.status(404).json({message: "User not Found"});
			} else {
				User.remove({_id: req.params.id}, function(err, user){
					if(err) {
						return res.status(400).json({message: "Bad Requested"});
					} else {
						return res.status(204).end();
					}
				});
			}
		})
	});

module.exports = router;