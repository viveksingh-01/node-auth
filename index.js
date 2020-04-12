const express = require('express');
const app = express();

const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(
  'mongodb+srv://vivek:nodeauth@cluster0-fbgxx.mongodb.net/test?retryWrites=true&w=majority',
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
