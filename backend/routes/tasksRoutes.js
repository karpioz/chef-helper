// This file contains all routes involved products and ingredients

import express from 'express'
const router = express.Router()

// Importing controllers
import {
	getTasks,
	createTask,
	updateTask,
	updateTaskFinished,
	deleteTask
} from '../controllers/tasksController.js'

// routes
// read all tasks
router.get('/', getTasks)

// create new task
router.post('/', createTask)

// update task
router.patch('/:id', updateTask)

// update finished tasks
router.patch('/finished/:id', updateTaskFinished)

// delete  finished task from database
router.delete('/:id', deleteTask)

export default router
