const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !Import Schema
const userSchema = require('../Schemas/userSchema');

// !create user Collection
const userCollection = mongoose.model('user', userSchema);
router.get('/', async (req, res) => {});
router.get('/:id', async (req, res) => {});
router.post('/', async (req, res) => {
	try {
		const user = req.body;
		const checkUser = new userCollection(user);
		const savedUser = await checkUser.save();
		if (savedUser._id) {
			res.status(200).send({
				message: 'User Inserted',
			});
		} else {
			res.status(404).send({
				message: 'User Inserted Faild',
			});
		}
	} catch (error) {
		res.status(500).send('There Was Server Side Error');
	}
});
router.put('/:id', async (req, res) => {});
router.delete('/:id', async (req, res) => {});

module.exports = router;
