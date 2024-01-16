const app = require('./config/express');
const db = require('./config/db');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log('Connection successful!')

    app.use('/api/users', routes.userRoutes);

    app.listen(PORT, () => console.log(`Server running on ${PORT}!`))
})