const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// error handling if connection fails
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'Connection Error:'));
dbConnection.once('open', () => {
  console.log('Connection successful!');

  // Apply middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Apply routes
  app.use('/api', routes); // Use '/api' as the prefix for all routes

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`);
  });
});
