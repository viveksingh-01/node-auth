const express = require('express');
const app = express();

const router = express.Router();

const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);

const port = 3000;
app.listen(port, () => {
  console.log('Server up and running...');
});
