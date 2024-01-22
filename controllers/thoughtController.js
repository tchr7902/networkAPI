// importing models
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

// the thought controller
const thoughtController = {
    // gets all of the user's thoughts
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

    // gets a specific thought by its corresponding id
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

    // allows for a thought to be created on a user
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

    // allows for the thought to be updated, finding it by its id and pushing the new information
    updateThought(req, res) {
        Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

    // allows for removal of a thought by its id
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

    // adds a reaction to a specific thought
    createReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

    // can delete a certain reaction from its id
    deleteReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { new: true, runValidators: true }
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

    // displays all of the reactions
    getAllReactions(req, res) {
        Reaction.find()
            .select('-__v')
            .then((reactions) => res.json(reactions))
            .catch((err) => res.status(400).json(err));
    },
    

}

module.exports = thoughtController;