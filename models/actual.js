//  require mongoose from connection model
const mongoose = require('./connection')

// grab Schema and model constructors
const { Schema, model } = mongoose

const actualSchema = new Schema ({
    name: String,
    description: String,
    amount: {type: Number, required: true},
    category: {type: String, required: true},
    date: String,
    type: {type: String, required: true},
    incomeAmount: Number,
    expenseAmount: Number,
    // get object id from the model referenced by 'User'
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

// make model from schema so we can use it
const Actual = model('Actual', actualSchema)

module.exports = Actual