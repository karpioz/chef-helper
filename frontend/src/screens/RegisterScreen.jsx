import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
//import { useDispatch, useSelector } from 'react-redux'
//import Message from '../components/Message.js'
//import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer'
//import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [name, setName] = useState('')
	const [message, setMessage] = useState(null)

	return (
		<FormContainer>
			<h1 className='text-center'>Register</h1>

			<Form>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control type='name' placeholder='Enter name'></Form.Control>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control type='email' placeholder='Enter Email'></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Register
				</Button>
			</Form>

			<Row className='py-3'>
				{/* <Col>
					Already registered?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login
					</Link>
				</Col> */}
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
