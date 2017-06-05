var express = require('express');
var router = express.Router();
var Exchange = require('../models/exchange.model');


router.route('/exchanges')
	// get all games
	.get((req,res) => {
		Exchange.find().sort({createdDate: 1})
				.populate([{ 
								path: 'games', 
							 	select: 'title category state userID Image' 
						   },
						   {
								path: 'users',
								select: 'local.login local.email'
						   }])
				.exec((err,exchanges) => {
			if(err){
				return res.status(400).json({message: "Bad Requested"});
			}else{
				return res.status(200).json(exchanges);
			}
		});
	})
	// post new game
	.post((req,res) => {
		var exchange = new Exchange({
			games: req.body.games,
			users: req.body.users,
			status: req.body.status,
		});
		// save the game
		exchange.save((err) => {
			if (err){
				return res.status(409).json({message: 'Wrong Exchange'});
			} else {
				return res.status(201).json(exchange);
			}
		});
	});

router.route('/exchanges/:id')
	.get((req, res) => {
		Exchange.find({users: req.params.id})
				.populate([{ 
								path: 'games', 
							 	select: 'title category state userID Image' 
						   },
						   {
								path: 'users',
								select: 'local.login local.email'
						   }])
				.exec((err, exchange) => {
					if(err){
						return res.status(400).json({message: "Bad Requested"});
					} else if(!exchange){
						return res.status(404).json({message: "Exchange not Found"});
					} else {
						return res.status(200).json(exchange);
					}
		});
	})

	.patch((req, res) => {
		Exchange.findByIdAndUpdate({_id: req.params.id}, req.body, (err, exchange) => {
			if(err){
				return res.status(400).json({message: "Bad Requested"});
			} else if(!exchange){
				return res.status(404).json({message: "Exchange not Found"});
			} else {
				return res.status(200).json(exchange);
			}
		});
	})

	.delete((req, res) => {
		Exchange.findByIdAndRemove({_id: req.params.id}, (err, exchange) => {
			if(err) {
				return res.status(400).json({message: "Bad Requested"});
			} else if(!exchange){
				return res.status(404).json({message: "Exchange not Found"});
			} else {
				return res.status(204).end();
			}
		})
	});


module.exports = router;