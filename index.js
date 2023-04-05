const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// import Routes
const authRoute = require('./routes/auth');

dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECTION_URL);

//Middleware
app.use(express.json())

//Route middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server Running... '));