var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leaderSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true,
	},
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}

});

var Promotions = mongoose.model('Promotion', promoSchema);

module.exports = Promotions;