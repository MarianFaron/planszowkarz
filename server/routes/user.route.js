var express = require('express');
var router = express.Router();
var User = require('../models/user.model');
var userGame = require('../models/userGame.model');

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
	.post((req,res) => {
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
			newUser.save((err) => {
				if (err){
					return res.status(409).json({message: 'Wrong user'});
				} else {
					return res.status(201).json(newUser);
				}
			});
		}
	});

router.route('/users/:id')
	.get((req, res) => {
		User.findById(req.params.id, (err, user) => {
			if(err){
				return res.status(400).json({message: "Bad Requested"});
			} else if(!user){
				return res.status(404).json({message: "User not Found"});
			} else {
				return res.status(200).json(user);
			}
		});
	})

	.patch((req, res) => {
		if(!req.body.password){
			return res.status(401).json({ message: "You haven't entered a password."});
		}

		User.findByIdAndUpdate({_id: req.params.id}, req.body, (err, user) => {
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
		User.findById(req.params.id, (err, user) => {
			if(err){
				return res.status(400).json({message: "Bad Requested"});
			} else if(!user){
				return res.status(404).json({message: "User not Found"});
			} else {
				User.remove({_id: req.params.id}, (err, user) => {
					if(err) {
						return res.status(400).json({message: "Bad Requested"});
					} else {
						return res.status(204).end();
					}
				});
			}
		})
	});

router.route('/users/:id/userGames')
	.get((req, res) => {
		userGame.find({ userID: req.params.id }, (err, game) => {
			if(err){
				return res.status(400).json({message: "Bad Requested"});
			} else if(!game){
				return res.status(404).json({message: "User not Found"});
			} else {
				return res.status(200).json(game);
			}
		});
	});


module.exports = router;