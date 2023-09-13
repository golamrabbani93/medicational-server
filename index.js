const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
// !middleware
app.use(express.json());
app.use(cors());

// !database connection with mongoose
const database = () => {
	try {
		mongoose
			.connect('mongodb://127.0.0.1:27017/', {
				dbName: 'Medicational',
			})
			.then(() => {
				console.log('database Connected');
			})
			.catch((err) => {
				console.log(err);
			});
	} catch (error) {
		console.log(error);
	}
};
database();
// !Root Directory
app.get('/', (req, res) => {
	res.status(200).send('Medicational Server Running ');
});

app.listen(port, () => {
	console.log(`Medicational Server Running on ${port}`);
});
