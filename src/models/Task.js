const mongoose = require("mongoose")

const Task = mongoose.model("Task", {
	content: String,
	completed: Boolean
})

module.exports = Task