import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
	return (
		<>
			<FormContainer>
				<h1 className='text-center'>Sign In</h1>
				<Form>
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

					<Button type='submit' variant='primary'>
						Sign In
					</Button>
				</Form>
			</FormContainer>

			<Row className='py-3 text-center'>
				<Col>
					New User? <Link to={'/register'}>Register</Link>
				</Col>
			</Row>
		</>
	)
}

export default LoginScreen
