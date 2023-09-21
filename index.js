require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

// Database connection
mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false //
});

app.use(bodyParser.json());

// Routes
const authRoutes = require('../routes/authRoutes');
const bookRoutes = require('../routes/bookRoutes');
const orderRoutes = require('../routes/orderRoutes');

app.use('/library', authRoutes);
app.use('/library', bookRoutes);
app.use('/library', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
