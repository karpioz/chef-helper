import React, { useEffect, useState } from 'react'
import { Row, Col, CardDeck } from 'react-bootstrap'
import axios from 'axios'
import RecipeComponent from '../components/RecipeComponent'

const RecipesScreen = () => {
	const [recipes, setRecipes] = useState([])

	const fetchRecipes = async () => {
		const { data } = await axios.get(`${process.env.REACT_APP_API}/recipes`)
		setRecipes(data)
	}

	useEffect(() => {
		fetchRecipes()
	}, [])

	return (
		<>
			<Row>
				<Col>
					<h1>Recipes</h1>
				</Col>
			</Row>
			<Row>
				<CardDeck>
					{recipes.map(recipe => (
						<RecipeComponent recipe={recipe} key={recipe._id} />
					))}
				</CardDeck>
			</Row>
		</>
	)
}

export default RecipesScreen
