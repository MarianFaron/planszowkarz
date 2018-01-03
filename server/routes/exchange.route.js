var express = require('express');
var router = express.Router();
var Exchange = require('../models/exchange.model');
var Chat = require('../models/chat.model');
var User = require('../models/user.model');
var Notification = require('../models/notification.model');

router.route('/exchanges')
	// get all games
	.get((req,res) => {
		Exchange.find().sort({date: -1})
				.populate([{
								path: 'recipientGame',
							 	select: 'title category state userID'
						   },
						   {
								path: 'senderGame',
							 	select: 'title category state userID'
						   },
						   {
								path: 'sender',
								select: 'local.login local.email facebook'
						   },
						   {
								path: 'recipient',
								select: 'local.login local.email facebook'
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
			proposeGames: req.body.proposeGames,
			senderGame: req.body.senderGame,
			recipientGame: req.body.recipientGame,
			sender: req.body.sender,
			recipient: req.body.recipient,
			senderRate: req.body.senderRate,
			recipientRate: req.body.recipientRate,
			status: req.body.status,
			date: new Date()
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
		Exchange.find({$or: [{sender: req.params.id}, {recipient: req.params.id}]})
				.sort({date: -1})
				.populate([{
								path: 'recipientGame',
							 	select: 'title category state userID'
						   },
						   {
								path: 'selectedGames',
							 	select: 'title category state userID'
						   },
						   {
								path: 'sender',
								select: 'local.login local.email facebook.name facebook.email'
						   },
						   {
								path: 'recipient',
								select: 'local.login local.email facebook.name facebook.email'
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

		var userName = '';
		var gameTitle = req.body.senderGame;
		var notificationMessage = '';
		var user = req.body.recipient;
		if(user) {
			(user.facebook) ? userName = user.facebook.name : userName = user.local.login;

			if(req.body.status == 'accepted') {
				 notificationMessage = "Użytkownik: " + userName + " zaakceptował wymianę za grę: " + gameTitle + ". Przejdź do czatu, aby się z nim skontaktować.";
			} else if (req.body.status == 'rejected') {
				 notificationMessage = "Użytkownik: " + userName + " odrzucił twoją propozycję wymiany.";
			}

			var notification = new Notification();

			notification.content = notificationMessage;
			notification.userID = req.body.sender._id;
			notification.date = new Date();
			notification.status = 'new';

			notification.save(function(err) {
				if (err)
					throw err;
			});
		}



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

router.route('/exchanges/:id/send')
	.get((req, res) => {
		Exchange.find({ $and: [{sender: req.params.id}, {status: 'pending'}]})
				.sort({date: -1})
				.populate([{
								path: 'recipientGame',
							 	select: 'title category state userID'
						   },
						   {
								path: 'selectedGames',
							 	select: 'title category state userID'
						   },
						   {
								path: 'sender',
								select: 'local.login local.email facebook.email facebook.name'
						   },
						   {
								path: 'recipient',
								select: 'local.login local.email facebook.email facebook.name'
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
	});

router.route('/exchanges/:id/received')
	.get((req, res) => {
		Exchange.find({ $and: [{recipient: req.params.id}, {status: 'pending'}]})
				.sort({date: -1})
				.populate([{
								path: 'recipientGame',
							 	select: 'title category state userID'
						   },
						   {
								path: 'selectedGames',
							 	select: 'title category state userID'
						   },
						   {
								path: 'sender',
								select: 'local.login local.email facebook.email facebook.name'
						   },
						   {
								path: 'recipient',
								select: 'local.login local.email facebook.email facebook.name'
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
	});

	router.route('/exchanges/close')
		.post((req, res) => {

			var exchangeId;

			Chat.findById(req.body.chatId, (err, chat) => {
				if(err){
					return res.status(400).json({message: "Bad Requested"});
				} else if(!chat){
					return res.status(404).json({message: "Chat not Found"});
				} else {

					exchangeId = chat.exchange;

					Exchange.findById(exchangeId, (err, exchange) => {
						if(err){
							return res.status(400).json({message: "Bad Requested"});
						} else if(!exchange){
							return res.status(404).json({message: "Exchange not Found"});
						} else {
							if(req.body.userId == exchange.sender) {
								exchange.isCLosedBySender = true;
							} else {
								exchange.isClosedByRecipient = true;
							}
							if(exchange.isCLosedBySender && exchange.isClosedByRecipient) {
								exchange.status = 'closed';

								chat.status = 'closed';
								chat.save();
							}
							exchange.save((err) => {
								if (err){
									return res.status(409).json({message: 'Wrong Exchange'});
								} else {
									return res.status(201).json(exchange);
								}
							});
						}
					});
				}
			});
		});

module.exports = router;
