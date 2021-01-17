import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
//import { useDispatch, useSelector } from 'react-redux'
//import Message from '../components/Message.js'
//import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer'
//import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
	// state with useState hook
	const [formData, setFormData] = useState({
		name: 'Pawel Karpinski',
		email: 'karpioz@example.com',
		password: 'admin123',
		confirmPassword: 'admin1234',
		buttonText: 'Submit'
	})
	// destructuring state
	const { name, email, password, confirmPassword, buttonText } = formData

	// submiting the form
	const handleSubmit = event => {}

	// handling input changes
	const handleInputChange = name => event => {
		console.log(event.target.value)
		// getting existing state and update the key with same name as function argument
		setFormData({ ...formData, [name]: event.target.value })
	}

	return (
		<FormContainer>
			<h1 className='text-center'>Register</h1>

			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={handleInputChange('name')}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter Email'
						value={email}
						onChange={handleInputChange('email')}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={handleInputChange('password')}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={handleInputChange('confirmPassword')}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					{buttonText}
				</Button>
			</Form>
			{JSON.stringify(name, email, password)}

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
