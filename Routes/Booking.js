const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import Schemas
const bookingSchema = require('../Schemas/bookingSchemas');

// !Create Collection
const BookingCollection = mongoose.model('booking', bookingSchema);

// !Middlewares
const verifyJwt = require('../middlewares/verifyJWT');

// !get all booking list
router.get('/', verifyJwt, async (req, res) => {
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
// !Get Single Booking By Id
router.get('/:id', verifyJwt, async (req, res) => {
	try {
		const bookingId = req.params.id;
		const bookingQuery = {_id: bookingId};
		const booking = await BookingCollection.findOne(bookingQuery);
		if (booking._id) {
			res.status(200).send({
				message: 'Successful',
				data: booking,
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

// !Post Booking
router.post('/', verifyJwt, async (req, res) => {
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
