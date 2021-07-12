const mongoose = require("mongoose")

const shopSchema = mongoose.Schema({
	name: String,
	/*
    other shop data
    */
})

module.exports = mongoose.model("Shop", shopSchema)