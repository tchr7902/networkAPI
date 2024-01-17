const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find()
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json(err));
    },

    getUserById(req, res) {
        User.findById(req.params.id)
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    updateUser(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.id)
        .then((user) => {
            return Thought.deleteMany({ _id: { $in: user.thoughts } });
        })
        .then(() => res.json({ message: 'User and associated thoughts deleted successfully!'}))
        .catch((err) => res.status(400).json(err));
    },

    addFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.userId,
            { $push: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    removeFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err))
    }
};

module.exports = userController;