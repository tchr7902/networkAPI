const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(400).json(err));
    },

    getThoughtById(req, res) {
        Thought.findById(req.params.id)
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findByIdAndUpdate(
                thought.username,
                { $push: { thoughts: thought._id } },
                { new: true, runValidators: true }
            );
        })
        .then(() => res.json({ message: 'Thought created successfully!' }))
        .catch((err) => res.status(400).json(err));
    },

    updateThought(req, res) {
        Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.id)
        .then((thought) => {
            return User.findByIdAndUpdate(
                thought.username,
                { $pull: { thoughts: thought._id } },
                { new: true, runValidators: true }
            );
        })
        .then(() => res.json({ message: 'Thought deleted successfully!' }))
        .catch((err) => res.status(400).json(err));
    },

    createReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

    deleteReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { new: true, runValidators: true }
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },
}

module.exports = thoughtController;