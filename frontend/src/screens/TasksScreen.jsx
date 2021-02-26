import React, { useState, useEffect } from 'react'
import {
	Row,
	Col,
	Table,
	Container,
	Button,
	Form,
	Modal
} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios'
import { isAuth } from '../utilities/authUtilities'
import { formatDistance, subDays, format } from 'date-fns'

const TasksScreen = () => {
	const [tasks, setTasks] = useState([])
	const [modalData, setModalData] = useState([])
	const [show, setShow] = useState(false)
	const [isCompleted, setIsCompleted] = useState(false)
	const [showRemove, setShowRemove] = useState(false)
	const [closeRemove, setCloseRemove] = useState(false)
	const [submitRemove, setSubmitRemove] = useState(false)

	const handleClose = () => setShow(false)

	const handleCloseRemove = () => setShowRemove(false)

	const handleModalSubmitRemove = e => {
		const { _id } = modalData
		e.preventDefault()
		axios({
			method: 'DELETE',
			url: `${process.env.REACT_APP_API}/tasks/${modalData._id}`,
			data: { _id }
		}).then(response => {
			console.log('item removed')
			toast.success(`Task has been deleted`)
			setTasks(tasks.filter(task => task._id !== _id))
			setSubmitRemove(true)
		})

		//closing modal
		handleCloseRemove()
	}

	const handleShowRemove = id => {
		console.log(id)
		setModalData(() => tasks.find(task => task._id === id))
		setShowRemove(true)
	}

	const handleTaskCompleted = e => {
		//
		setIsCompleted(true)

		const { completed, priority } = modalData
		e.preventDefault()
		axios({
			method: 'PATCH',
			url: `${process.env.REACT_APP_API}/tasks/${modalData._id}`,
			data: { completed, priority }
		}).then(response => {
			toast.success(`Task has been completed!`)
		})
	}

	// Priority Colour Styles
	const setPriorityColour = level => {
		let colour
		switch (level) {
			case 'low':
				colour = 'info'
				break
			case 'medium':
				colour = 'warning'
				break
			case 'high':
				colour = 'danger'
				break
			default:
				colour = 'success'
		}
		return colour
	}

	// fetching tasks on load
	const fetchTasks = async () => {
		const { data } = await axios.get(`${process.env.REACT_APP_API}/tasks`)
		setTasks(data)
	}

	useEffect(() => {
		fetchTasks()
	}, [])

	console.log(tasks)

	return (
		<Container>
			<Row>
				<Col>
					<ToastContainer />
					<h1>Jobs to-do List</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<Table bordered hover size='sm'>
						<thead className='bg-dark text-light'>
							<tr>
								<th>Job to do</th>
								<th>Assigned To</th>
								<th>Priority</th>
								<th>Date / Time</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task, index) => (
								<tr key={index}>
									<td className={task.completed ? 'table-success' : null}>
										{task.taskName}
									</td>
									<td className={task.completed ? 'table-success' : null}>
										{task.assignedTo.name.split(' ')[0]}
									</td>
									<td
										className={`table-${setPriorityColour(
											task.priority
										)} text-center`}
									>
										{task.priority}
									</td>
									<td className={task.completed ? 'table-success' : null}>
										{task.createdAt.split('T')[0]}
										<span className='text-danger'> | </span>
										{task.createdAt.split('T')[1].split('.')[0]}
									</td>
									{isAuth() ? (
										<td className='text-right'>
											<Form onSubmit={e => handleTaskCompleted(task._id)}>
												<Button
													disabled={task.completed ? true : false}
													className='mx-1'
													variant='success'
													size='sm'
													onClick={console.log(task._id)}
													type='submit'
												>
													<i className='fas fa-check'></i>
												</Button>
											</Form>

											<Button className='mx-1' variant='warning' size='sm'>
												<i className='fas fa-edit'></i>
											</Button>
											{isAuth() && isAuth().role === 'admin' ? (
												<Button
													/* disabled={task.completed ? false : true} */
													className='mx-1'
													variant='danger'
													size='sm'
													onClick={() => handleShowRemove(task._id)}
												>
													<i className='fas fa-minus'></i>
												</Button>
											) : null}
										</td>
									) : (
										<td>
											<p className='text-danger text-small'>
												<small>Please login to see actions</small>
											</p>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
			{/* Remove Product Modal */}
			<Modal show={showRemove} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Please Confirm</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleModalSubmitRemove}>
					<Modal.Body>
						<h3>
							Remove of <span className='text-danger'>completed task</span>
						</h3>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='warning' onClick={handleCloseRemove}>
							Cancel
						</Button>
						<Button variant='danger' type='submit'>
							Remove
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</Container>
	)
}

export default TasksScreen
