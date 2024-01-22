// models
const User = require('../models/User.js');
const Thought = require('../models/Thought.js');

// the user controller and its corresponding functions
const userController = {
    // gets all users
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

    // gets a specific user by its id
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

    // creates a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    // updates a users information
    updateUser(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    // can delete a user by its id
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

    // can add a friend using two user ids
    addFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.userId,
            { $push: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    // can remove a friend using two user ids
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