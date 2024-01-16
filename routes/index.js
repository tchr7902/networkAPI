const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

const router = require('express').Router();

router.use('/api/users', userRoutes);

module.exports = router;