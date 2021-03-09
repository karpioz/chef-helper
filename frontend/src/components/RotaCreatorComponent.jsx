import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import moment from 'moment'

moment.locale('en-gb')

const RotaCreatorComponent = () => {
	const [rota, setRota] = useState([])

	const handleWeekEndingDate = e => {
		let weekStartingDate = e.target.value
		let weekDays = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		]
		let newRota = []

		for (let i = 0; i <= 6; i++) {
			let day = { day: '', date: '' }
			day.day = weekDays[i]
			day.date = moment(weekStartingDate).add(i, 'days').format('LLLL')
			console.log(day)
			newRota.push(day)
		}

		setRota(newRota)

		console.log(rota)
	}

	useEffect(() => {
		console.log(rota)
	}, [rota])

	return (
		<Form>
			<Form.Group>
				<Form.Label>Select week ending</Form.Label>
				<Form.Control
					type='date'
					onChange={handleWeekEndingDate}
				></Form.Control>
			</Form.Group>
		</Form>
	)
}

export default RotaCreatorComponent
