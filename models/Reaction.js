const { Schema, model } = require('mongoose');

// mongoose schema with parameters
const reactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
