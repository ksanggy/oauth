const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// import Routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');

dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECTION_URL).finally(()=> {
  console.log('DB Connected!');
});

//Middleware
app.use(express.json())

//Route middleware
app.use('/api/user', authRoute);
app.use('/api/admin/user', usersRoute);

app.listen(3000, () => console.log('Server Running... '));