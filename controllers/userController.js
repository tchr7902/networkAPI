const User = require('../models/User.js');
const Thought = require('../models/Thought.js');

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

    getUserById(req, res, next) {
        const { id } = req.params;

        User.findById(id)
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            })
            .catch(next);
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

    deleteUser(req, res, next) {
        const { id } = req.params;

        User.findByIdAndDelete(id)
            .then((deletedUser) => {
                if (!deletedUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }

                // Remove user's associated thoughts
                return Thought.deleteMany({ username: deletedUser.username });
            })
            .then(() => {
                res.json({ message: 'User and associated thoughts deleted successfully!' });
            })
            .catch(next);
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