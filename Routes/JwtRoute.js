const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !Import Schema
const userSchema = require('../Schemas/userSchema');

// !create user Collection
const userCollection = mongoose.model('user', userSchema);
router.get('/', async (req, res) => {
	try {
		const email = req.query.email;
		const user = await userCollection.findOne({email});
		if (user.email) {
			const token = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN, {
				expiresIn: '1h',
			});
			res.status(200).send({
				message: 'Token Generated',
				token: token,
			});
		} else {
			res.status(404).send({
				message: 'Token Generated Faild',
			});
		}
	} catch (error) {
		res.status(500).send('There Was Server Side Error');
	}
});

module.exports = router;
