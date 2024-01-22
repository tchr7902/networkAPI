// bringing in mongoose, setting up the connection using the connection string, exporting
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;
module.exports = {
    url: 'mongodb://localhost:27017/social_network',
  };
  