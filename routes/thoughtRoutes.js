const router = require('express').Router();

// getting all functions for the thoughtRoutes, applying those functions to specific routes
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
    getAllReactions,
} = require('../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').get(getAllReactions).post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;
