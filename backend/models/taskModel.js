// mongoDB Object Modelling
import mongoose from 'mongoose'

const tasksSchema = new mongoose.Schema(
	{
		taskName: {
			type: String,
			trim: true,
			required: true
		},
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		priority: {
			type: String
		},
		completed: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
)

const Task = mongoose.model('Task', tasksSchema)

export default Task
