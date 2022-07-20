//  require mongoose from connection model
const mongoose = require('./connection')

// grab Schema and model constructors
const { Schema, model } = mongoose

const investmentSchema = new Schema ({
    name: String,
    description: String,
    amount: Number,
    category: String,
    // get object id from the model referenced by 'User'
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

// make model from schema so we can use it
const Investment = model('Investment', investmentSchema)

module.exports = Investment