const { Schema, model } = require("mongoose");
const reactionModel = require("./Reaction")

const ThoughtModel = new Schema({
    thoughtText: {
        type:String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date()
    },
    username : {
        type:String,
        required: true
    },
    reactions: [reactionModel]
})

ThoughtModel.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', ThoughtModel)

module.exports= Thought