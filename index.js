const express = require('express');
const app = express();

// Import routes
const authRoute = require('./routes/auth');

// Route middlewares
app.use('/api/user', authRoute);

const port = 3000;
app.listen(port, () => {
  console.log('Server up and running...');
});
