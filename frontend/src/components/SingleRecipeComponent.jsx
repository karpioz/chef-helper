import React from 'react'
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

function SingleRecipeComponent({ recipe }) {
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

						{recipe.ingredientLines.map((ingr, i) => (
							<ListGroup.Item key={i} variant='success'>
								{ingr}
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>
				<Col md={4}>
					<ListGroup flush='true'>
						<ListGroup.Item>
							<h3>Pantry Stock</h3>
						</ListGroup.Item>
						{recipe.ingredients.map((ing, i) => (
							<ListGroup.Item key={ing.productId._id} variant='info'>
								<strong>{ing.productId.name}: </strong>
								{ing.productId.countInStock}
							</ListGroup.Item>
						))}
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

export default SingleRecipeComponent
