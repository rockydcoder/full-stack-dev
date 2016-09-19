var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
	Favorites.find({})
	.populate('postedBy')
	.populate('dishes')
	.exec(function (err, favorite) {
		if (err) throw err;
		res.json(favorite);
	});

})

.post(Verify.verifyOrdinaryUser, function (req,res,next){
	var postedBy = req.decoded._doc._id;
	Favorites.count( {postedBy: postedBy}, function (err, count) {
		if (count == 0) {
			Favorites.create({postedBy: postedBy}, function (err, favorite) {
				favorite.dishes.push(req.body._id);
				favorite.save(function (err, favorite) {
					if (err) throw err;
					res.json(favorite);
				});
			});
		}

		else {
			Favorites.findOne( {postedBy: postedBy}, function (err, favorite) {
				if (err) throw err;
				console.log(favorite.dishes);
				favorite.dishes.push(req.body._id);
				favorite.save(function (err, favorite) {
					if (err) throw err;
						console.log('Inside save');

					res.json(favorite);
				});
			});
		}
	});
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
	Favorites.remove({}, function (err, resp) {
		if (err) throw err;
		res.json(resp);
	})
});

favoriteRouter.route('/:dishId')

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
	var postedBy = req.decoded._doc._id;
	Favorites.findOne( {postedBy: postedBy}, function (err, favorite) {
		if (err) throw err;
		favorite.dishes.id(req.params.dishId).remove();
		favorite.save(function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});
});



module.exports = favoriteRouter;