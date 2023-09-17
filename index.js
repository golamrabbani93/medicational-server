const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
// !middleware
app.use(cors());
app.use(express.json());

// ! Import Routes
const appointmentRoute = require('./Routes/AppointmentOption');
const bookingRoute = require('./Routes/Booking');
const userRoute = require('./Routes/User');
const jwtRiute = require('./Routes/JwtRoute');
// !database connection with mongoose
const database = () => {
	try {
		mongoose
			.connect('mongodb://127.0.0.1:27017/', {
				dbName: 'Medicational',
				family: 4,
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

// !Appointment Option Route
app.use('/appointment', appointmentRoute);
// !Booking Route
app.use('/booking', bookingRoute);
// !User Route
app.use('/user', userRoute);
// !jwt Route
app.use('/jwt', jwtRiute);
database();
// !Root Directory
app.get('/', (req, res) => {
	res.status(200).send('Medicational Server Running ');
});

app.listen(port, () => {
	console.log(`Medicational Server Running on ${port}`);
});
