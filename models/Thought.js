const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

function dateFormat(timestamp) {

}

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;