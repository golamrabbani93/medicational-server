const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const verifyJWT = require('../middlewares/verifyJWT');
const verifyAdmin = require('../middlewares/verifyAdmin');

//!Schemas
const doctorSchema = require('../Schemas/doctorSchema');
const appointmentSchema = require('../Schemas/appointmentSchema');

// !collections
const doctorCollection = mongoose.model('doctor', doctorSchema);
const AppointmentCollection = mongoose.model('appointmentoption', appointmentSchema);

router.get('/', verifyJWT, verifyAdmin, async (req, res) => {
	try {
		const qurey = {};
		const allDoctors = await doctorCollection.find(qurey);
		if (allDoctors[0]) {
			res.status(200).send({
				message: 'Successful',
				data: allDoctors,
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
router.post('/', verifyJWT, async (req, res) => {
	try {
		const doctorData = req.body;
		const newDoctorData = new doctorCollection(doctorData);
		const savedData = await newDoctorData.save();
		if (savedData._id) {
			res.status(200).send({
				message: 'Successful',
				data: savedData,
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
// !delete Doctor By Ids
router.delete('/:id', verifyJWT, verifyAdmin, async (req, res) => {
	try {
		const id = req.params.id;
		const query = {_id: id};
		const result = await doctorCollection.deleteOne(query);
		if (result.deletedCount > 0) {
			res.status(200).send({
				message: 'Delete Successful',
			});
		} else {
			res.status(404).send({
				message: 'Delete Successful',
			});
		}
	} catch (error) {
		res.status(500).send('There was Sever Side Error');
	}
});
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
