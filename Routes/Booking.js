const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// !import Schemas

const bookingSchema = require('../Schemas/bookingSchemas');

// !Create Collection
const BookingCollection = mongoose.model('booking', bookingSchema);

router.get('/', async (req, res) => {
	try {
		const userEmail = req.query.email;
		const bookingQuery = {email: userEmail};
		const userBooking = await BookingCollection.find(bookingQuery);
		if (userBooking[0]) {
			res.status(200).send({
				message: 'Successful',
				data: userBooking,
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
router.post('/', async (req, res) => {
	try {
		const bookingData = req.body;
		const checkedBooking = new BookingCollection(bookingData);
		const savedBooking = await checkedBooking.save();
		if (savedBooking._id) {
			res.status(200).send({
				message: 'Booking Confrimed',
				data: savedBooking,
			});
		} else {
			res.status(404).send({
				message: 'Booking Faild',
				data: 0,
			});
		}
	} catch (error) {
		res.status(500).send('There was Sever Side Error');
	}
});
router.put('/:id', async (req, res) => {});
router.delete('/:id', async (req, res) => {});

module.exports = router;
