const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//!Schemas
const doctorSchema = require('../Schemas/doctorSchema');
const appointmentSchema = require('../Schemas/appointmentSchema');

// !collections
const doctorCollection = mongoose.model('doctor', doctorSchema);
const AppointmentCollection = mongoose.model('appointmentoption', appointmentSchema);
router.get('/specialities', async (req, res) => {
	try {
		const query = {};
		const specialities = await AppointmentCollection.find({}).select('name');
		if (specialities[0]) {
			res.status(200).send({
				message: 'Successful',
				data: specialities,
			});
		} else {
			res.status(404).send({
				message: 'Data Not Found',
				data: 0,
			});
		}
	} catch (error) {
		res.status(500).send('There was Sever Side Error');
	}
});

module.exports = router;