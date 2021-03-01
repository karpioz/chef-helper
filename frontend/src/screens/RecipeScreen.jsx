import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
	Row,
	Col,
	Button,
	Container,
	Image,
	ListGroup,
	Badge
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const RecipeScreen = () => {
	const [recipe, setRecipe] = useState([])
	const { id } = useParams()

	useEffect(() => {
		// fetching single recipe with id from url
		const fetchRecipe = async () => {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/recipes/${id}`
			)
			setRecipe(data)
		}

		fetchRecipe()
	}, [])

	return (
		<Container className='my-3'>
			<Row>
				<Col md={4}>
					<Image src={recipe.image} alt={recipe.label} fluid />
					{recipe.healthLabels.map((label, i) => (
						<Badge key={i} variant='success' className='m-1'>
							{label}
						</Badge>
					))}
				</Col>
				<Col md={4}>
					<ListGroup flush='true'>
						<ListGroup.Item>
							<h3>{recipe.label}</h3>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<ListGroup>
						<ListGroup.Item>
							<h3>Pantry</h3>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
			<Row className='my-3'>
				<Col>
					<LinkContainer to={'/recipes'}>
						<Button variant='danger'>Back</Button>
					</LinkContainer>
				</Col>
			</Row>
		</Container>
	)
}

export default RecipeScreen
