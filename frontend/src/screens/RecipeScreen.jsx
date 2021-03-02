import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'
import SingleRecipeComponent from '../components/SingleRecipeComponent'

const RecipeScreen = () => {
	const [recipe, setRecipe] = useState({})
	const [isFetching, setIsFetching] = useState(true)
	const { id } = useParams()

	useEffect(() => {
		// fetching single recipe with id from url
		const fetchRecipe = async () => {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/recipes/${id}`
			)
			setRecipe(data)
			setIsFetching(false)
		}

		fetchRecipe()
	}, [])

	return (
		<>
			{isFetching ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<SingleRecipeComponent recipe={recipe} />
			)}
		</>
	)
}

export default RecipeScreen
