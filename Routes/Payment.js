const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !Stripe api key
const stripe = require('stripe')(
	'sk_test_51NtpOFBOLaOXSm4LxrvxeDKt9dpaxEa1H5x41D3PInctoSyDacWE6RSe3fMnxa48hragfbjvJTIGBcb7BcHIco8400FcMA9cE7',
);
router.get('/', async (req, res) => {
	res.send('Payment Router');
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
