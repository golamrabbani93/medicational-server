const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	slots: {
		type: Array,
		required: true,
	},
});

module.exports = appointmentSchema;
