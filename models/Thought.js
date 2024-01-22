const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Reaction = require('./Reaction');

// mongoose schema with parameters
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reactions: [Reaction.schema]
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
