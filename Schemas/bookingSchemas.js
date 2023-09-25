const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	treatment: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	slot: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	paid: {
		type: Boolean,
	},
});

module.exports = bookingSchema;
