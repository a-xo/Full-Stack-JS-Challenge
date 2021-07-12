const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	name: String,
	/*
    other user data
    */
})

module.exports = mongoose.model("User", userSchema)