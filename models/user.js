// import dependencies
//////////////////////////////////////
const mongoose = require('./connection')

// Define user model
//////////////////////////////////////
// get schema and model constructors from mongoose
const { Schema, model } = mongoose
// userSchema
const userSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
// user model from userSchema
const User = model('User', userSchema)

// export user model
module.exports = User