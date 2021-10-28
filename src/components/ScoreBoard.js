import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ScoreBoard = ({ score }) => {
	const [gameStates, setGameStates] = useState(null)
	const [userName, setUsername] = useState(null)
	const randomUserNames = [
		'glarmingsinsect',
		'chissingsinspector',
		'resolutionhenders',
		'koiledsintention',
		'crucketsglad',
		'tomorrowdrups',
		'ownerstrutchings',
		'borkiesdecision',
		'gleadsanything',
		'wurningsfee',
		'agencylurgers',
		'boonerismsrelief',
		'blamechates',
		'shightsequivalent',
		'gimmingsguest',
		'seardscoast',
	]
	const fetchData = async () => {
		const response = await axios.get('http://localhost:8080/scores')
		console.log(response.data.data)
		let data = Object.keys(response.data.data).map(
			(item) => response.data.data[item]
		)
		let sortedData = data.sort((a, b) => b.score - a.score)
		setGameStates(sortedData)
	}

	const saveData = async () => {
		const data = {
			username: userName,
			score: score,
		}
		axios
			.post('http://localhost:8080/addscore', data)
			.then((response) => {
				console.log(response)
			})
			.then(fetchData)
			.catch((err) => console.log({ err }))
	}
	useEffect(() => {
		fetchData()
		setUsername(
			randomUserNames[Math.floor(randomUserNames.length * Math.random())]
		)
		console.log(userName)
	}, [])

	return (
		<div className='score-board'>
			<h2>
				{userName} : {score}
			</h2>
			<h2>
				{gameStates?.map((item, index) => (
					<li key={index}>
						{item.username} : {item.score}
					</li>
				))}
			</h2>
			<h2>High Scores:</h2>
			<button onClick={saveData}>Save score</button>
		</div>
	)
}

export default ScoreBoard
