const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import Schemas

const appointmentSchema = require('../Schemas/appointmentSchema');
const bookingSchema = require('../Schemas/bookingSchemas');

// !Create appointmentoption Collection
const appointment = mongoose.model('appointmentoption', appointmentSchema);
// !Get booking Collection
const BookingCollection = mongoose.model('booking', bookingSchema);

router.get('/', async (req, res) => {
	try {
		const date = req.query.date;
		const appointmentOptions = await appointment.find({});
		// !booking query
		const bookingQuery = {date: date};
		const bookedData = await BookingCollection.find(bookingQuery);
		appointmentOptions.forEach((option) => {
			const optionBooked = bookedData.filter((book) => book.treatment === option.name);
			const bookedSlots = optionBooked.map((book) => book.slot);
			const remainSlots = option.slots.filter((slot) => !bookedSlots.includes(slot));
			option.slots = remainSlots;
		});
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
