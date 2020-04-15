const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

// Middlewares
app.use(express.json());

// Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);

const port = 3000;
app.listen(port, () => {
  console.log('Server up and running...');
});
