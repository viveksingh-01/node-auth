const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// MongoDB connection
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to DB');
  }
);

// Import routes
const authRoute = require('./routes/auth');

// Route middlewares
app.use('/api/user', authRoute);

const port = 3000;
app.listen(port, () => {
  console.log('Server up and running...');
});
