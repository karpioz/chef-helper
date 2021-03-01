import React from 'react'
import { Card, Button, Badge, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function RecipeComponent({ recipe }) {
	return (
		<Card key={recipe._id} style={{ width: '18rem' }}>
			<Card.Img variant='top' src={recipe.image} />
			<Card.Body>
				<Card.Title>{recipe.label}</Card.Title>
				<Card.Text>
					{recipe.healthLabels.map((label, i) => (
						<Badge key={i} variant='success' className='m-1'>
							{label}
						</Badge>
					))}
				</Card.Text>
				<Card.Text>
					<ListGroup>
						{recipe.ingredientLines.map((ingr, i) => (
							<ListGroup.Item key={i}>{ingr}</ListGroup.Item>
						))}
					</ListGroup>
				</Card.Text>

				<LinkContainer to={`recipes/${recipe._id}`}>
					<Button variant='warning'>View Details</Button>
				</LinkContainer>
			</Card.Body>
		</Card>
	)
}

export default RecipeComponent
