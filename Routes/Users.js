const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !Import Schema
const userSchema = require('../Schemas/userSchema');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyAdmin = require('../middlewares/verifyAdmin');

// !create user Collection
const userCollection = mongoose.model('user', userSchema);
router.get('/', verifyJWT, async (req, res) => {
	try {
		const users = await userCollection.find({});
		if (users.length > 0) {
			res.status(200).send({
				message: 'Successful',
				data: users,
			});
		} else {
			res.status(404).send({
				message: 'Data Not Found',
				data: 0,
			});
		}
	} catch (error) {
		res.status(500).send('There Was Server Side Error');
	}
});
router.get('/:id', async (req, res) => {});
router.post('/', async (req, res) => {
	try {
		const user = req.body;

		const userQuery = {
			email: user.email,
		};
		//! Check user Already in database
		const getUser = await userCollection.find(userQuery);

		if (!getUser[0]) {
			const newUser = new userCollection(user);
			const savedUser = await newUser.save();
			if (savedUser._id) {
				res.status(200).send({
					message: 'User Inserted',
				});
			} else {
				res.status(404).send({
					message: 'User Inserted Faild',
				});
			}
		} else {
			res.status(200).send({
				message: 'User already in Database',
			});
		}
	} catch (error) {
		res.status(500).send('There Was Server Side Error');
	}
});
router.get('/admin/:email', async (req, res) => {
	try {
		const email = req.params.email;
		const query = {email};
		const user = await userCollection.findOne(query);
		if (user.role !== 'Admin') {
			return res.send({
				Admin: false,
			});
		}
		return res.status(200).send({
			Admin: true,
		});
	} catch (error) {
		res.status(500).send('There Was Server Side Error');
	}
});
router.put('/admin/:id', verifyJWT, async (req, res) => {
	try {
		//! check user Admin or Not
		const decodedEmail = req.decoded.email;
		const admin = await userCollection.findOne({email: decodedEmail});
		if (admin.role !== 'Admin') {
			return res.status(403).send({
				message: 'Make Admin Faild',
			});
		}
		const userId = req.params.id;
		const query = {_id: userId};
		const user = await userCollection.findOne(query);
		const updateDoc = {
			$set: {
				role: 'Admin',
			},
		};
		const result = await userCollection.updateOne(query, updateDoc);
		if (result.acknowledged) {
			res.status(200).send({
				message: 'Make Admin Successful',
			});
		} else {
			res.status(403).send({
				message: 'Make Admin Faild',
			});
		}
	} catch (error) {
		res.status(500).send('There Was Server Side Error');
	}
});
router.delete('/:id', verifyJWT, async (req, res) => {
	try {
		const id = req.params.id;
		const query = {_id: id};
		const deleteUser = await userCollection.deleteOne(query);
		if (deleteUser.deletedCount > 0) {
			res.status(200).send({
				message: 'Delete Successful',
			});
		} else {
			res.status(404).send({
				message: 'Delete Faild',
			});
		}
	} catch (error) {
		res.status(500).send('There Was Server Side Error');
	}
});

module.exports = router;
