const mongoose = require('mongoose');
// !get user Schema
const userSchema = require('../Schemas/userSchema');
// !get User Collection for find user
const userCollection = mongoose.model('user', userSchema);

const verifyAdmin = async (req, res, next) => {
	const decodedEmail = req.decoded.email;
	const admin = await userCollection.findOne({email: decodedEmail});
	if (admin.role !== 'Admin') {
		return res.status(401).send('Unauthorized Access');
	}
	next();
};
module.exports = verifyAdmin;
