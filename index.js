const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');

// !middleware
app.use(cors());
app.use(express.json());
dotenv.config();
// ! Import Routes
const appointmentRoute = require('./Routes/AppointmentOption');
const bookingRoute = require('./Routes/Booking');
const userRoute = require('./Routes/Users');
const JwtRoute = require('./Routes/JwtRoute');
const doctorRoute = require('./Routes/Doctor');
const paymentRoute = require('./Routes/Payment');
// !database conection with mongoose
const database = () => {
	try {
		mongoose
			.connect(process.env.MEDICATIONAL_DATABASE, {
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
app.use('/users', userRoute);
// !jwt Route
app.use('/jwt', JwtRoute);
// !Doctor Route
app.use('/doctor', doctorRoute);
// !Payment Route
app.use('/payment', paymentRoute);
database();
// !Root Directory
app.get('/', (req, res) => {
	res.status(200).send('Medicational Server Running ');
});

app.listen(port, () => {
	console.log(`Medicational Server Running on ${port}`);
});
