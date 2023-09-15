const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import Schemas

const appointmentSchema = require('../Schemas/appointmentSchema');

// !Create Collection
const appointment = mongoose.model('appointmentoption', appointmentSchema);

router.get('/', async (req, res) => {
	try {
		const appointmentOptions = await appointment.find({});
		if (appointmentOptions[0]) {
			res.status(200).send({
				message: 'Successful',
				data: appointmentOptions,
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
router.get('/:id', async (req, res) => {});
router.post('/', async (req, res) => {});
router.put('/:id', async (req, res) => {});
router.delete('/:id', async (req, res) => {});

module.exports = router;
