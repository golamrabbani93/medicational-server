const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !middlewares
const verifyJwt = require('../middlewares/verifyJWT');

// !Stripe api key
const stripe = require('stripe')(
	'sk_test_51NtpOFBOLaOXSm4LxrvxeDKt9dpaxEa1H5x41D3PInctoSyDacWE6RSe3fMnxa48hragfbjvJTIGBcb7BcHIco8400FcMA9cE7',
);
// !Payment Schema
const paymentSchema = require('../Schemas/paymentSchema');
const bookingSchemas = require('../Schemas/bookingSchemas');

// !Payment Collection
const bookingCollection = mongoose.model('booking', bookingSchemas);
const paymentCollection = mongoose.model('Payment', paymentSchema);
router.get('/', async (req, res) => {
	res.send('Payment Router');
});
router.post('/', async (req, res) => {
	try {
		const paymentData = req.body;
		// !upadate Booking By booking ID
		const query = {_id: paymentData.bookingId};
		const updatedDoc = {
			$set: {
				paid: true,
			},
		};
		const updatedBooking = await bookingCollection.updateOne(query, updatedDoc);
		if (updatedBooking.modifiedCount > 0) {
			// !Save Payment Information
			const savedPayment = new paymentCollection(paymentData);
			const result = await savedPayment.save();
			if (result._id) {
				res.status(200).send({
					message: 'Payment Data Inserted',
				});
			} else {
				res.status(404).send({
					message: 'Payment Data Inserted',
				});
			}
		}
	} catch (error) {
		res.status(500).send('There was Sever Side Error');
	}
});
router.post('/create-payment-intent', async (req, res) => {
	try {
		const booking = req.body;
		const {price} = booking;
		const modifyPrice = price * 100;

		const paymentIntent = await stripe.paymentIntents.create({
			amount: modifyPrice,
			currency: 'usd',
			payment_method_types: ['card'],
		});

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		res.status(500).send('There was Sever Side Error');
	}
});
module.exports = router;
