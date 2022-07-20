//  require mongoose from connection model
const mongoose = require('./connection')

// grab Schema and model constructors
const { Schema, model } = mongoose

const goalSchema = new Schema ({
    name: String,
    description: String,
    // get object id from the model referenced by 'User'
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

// make model from schema so we can use it
const Goal = model('Goal', goalSchema)

module.exports = Goal