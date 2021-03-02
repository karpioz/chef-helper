import React from 'react'
import { Form, Button, Col } from 'react-bootstrap'

const RecipeCreatorComponent = ({
	handleRecipeSubmit,
	handleRecipeCreatorInputChange,
	recipeCreatorData
}) => {
	const { label, healthLabels, image } = recipeCreatorData

	return (
		<Form onSubmit={handleRecipeSubmit}>
			<Form.Row>
				<Form.Group as={Col} controlId='label'>
					<Form.Label>Dish Name</Form.Label>
					<Form.Control
						type='text'
						onChange={handleRecipeCreatorInputChange('label')}
						placeholder='Dish Name'
						name='label'
						value={label}
					></Form.Control>
				</Form.Group>
				<Form.Group as={Col} controlId='healthLabels'>
					<Form.Label>Health Labels</Form.Label>
					<Form.Control
						type='text'
						placeholder="Health labels, separate by coma ','"
						onChange={handleRecipeCreatorInputChange('healthLabels')}
						name='healthLabels'
						value={healthLabels}
					></Form.Control>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col} controlId='image'>
					<Form.Label>Image Link</Form.Label>
					<Form.Control
						type='text'
						placeholder='Please paste url for image file'
						onChange={handleRecipeCreatorInputChange('image')}
						name='image'
						value={image}
					></Form.Control>
				</Form.Group>
				<Form.Group as={Col} controlId='photo'>
					<Form.Label>Photo Upload</Form.Label>
					<Form.Control
						type='file'
						onChange={handleRecipeCreatorInputChange('image')}
						name='image'
					></Form.Control>
				</Form.Group>
			</Form.Row>
			<Button variant='success' type='submit'>
				Add Recipe
			</Button>
		</Form>
	)
}

export default RecipeCreatorComponent
