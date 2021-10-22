import { useState, useEffect, useCallback } from 'react'
import StarTrek1 from './images/Star Trek/1.png'
import StarTrek2 from './images/Star Trek/2.jpg'
import StarTrek3 from './images/Star Trek/3.jpg'
import StarTrek4 from './images/Star Trek/4.png'
import StarTrek5 from './images/Star Trek/5.png'
import StarTrek6 from './images/Star Trek/6.png'
import StarTrek7 from './images/Star Trek/7.png'
import StarTrek8 from './images/Star Trek/8.png'
import BlankSquare from './images/Star Trek/ex1.png'

const width = 8
const candyColors = [
	StarTrek1,
	StarTrek2,
	StarTrek3,
	StarTrek4,
	StarTrek5,
	StarTrek6,
]

const App = () => {
	//const [universe, setUniverse] = useState('Star Trek')

	const [currentColorArrangement, setCurrentColorArrangement] = useState([])
	const [squareBeingDragged, setSquareBeingDragged] = useState(null)
	const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
	const [scoreDisplay, setScoreDisplay] = useState(0)
	// // useEffect(() => {
	// // 	if (window) {
	// // 		let answer = window.prompt(
	// // 			"Do you prefer Star Trek or Star Wars? (Type in 'Star Wars' or 'Star Trek')"
	// // 		)
	// // 		if (answer === 'Star Trek') {
	// // 			setUniverse(answer)
	// // 		} else if (answer === 'Star Wars') {
	// // 			setUniverse(answer)
	// // 		} else {
	// // 			setUniverse('Star Wars')
	// // 		}
	// // 	}
	// // }, [universe, setUniverse])

	// function importAll(r, universe) {
	// 	let images = {}
	// 	console.log(r)
	// 	console.log({ r })
	// 	console.log('Keys:', r.keys())

	// 	return r
	// 		.keys()
	// 		.filter((item) => item.includes(universe))
	// 		.map(
	// 			(item, index) =>
	// 				(images[item.replace('./', '')] = r(item).default)
	// 		)
	// }

	// const images = importAll(
	// 	require.context('./images', true, /\.(png|jpe?g|svg)$/),
	// 	universe
	// )

	// useEffect(() => {
	// 	function importAll(r, universe) {
	// 		let images = {}
	// 		console.log(r)
	// 		console.log({ r })
	// 		console.log('Keys:', r.keys())

	// 		return r
	// 			.keys()
	// 			.filter((item) => item.includes(universe))
	// 			.map(
	// 				(item, index) =>
	// 					(images[item.replace('./', '')] = r(item).default)
	// 			)
	// 	}
	// 	const images = importAll(
	// 		require.context('./images', true, /\.(png|jpe?g|svg)$/),
	// 		universe
	// 	)
	// 	console.log({ images })
	// }, [])

	const checkForColumnOfThree = useCallback(() => {
		for (let i = 0; i <= 47; i++) {
			const columnOfThree = [i, i + width, i + width * 2]
			const decidedColor = currentColorArrangement[i]
			const isBlank = currentColorArrangement[i] === BlankSquare

			if (
				columnOfThree.every(
					(square) =>
						currentColorArrangement[square] === decidedColor &&
						!isBlank
				)
			) {
				setScoreDisplay((score) => score + 3)

				columnOfThree.forEach(
					(square) => (currentColorArrangement[square] = BlankSquare)
				)
				return true
			}
		}
	}, [currentColorArrangement])

	const checkForColumnOfFour = useCallback(() => {
		for (let i = 0; i <= 39; i++) {
			const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
			const decidedColor = currentColorArrangement[i]
			const isBlank = currentColorArrangement[i] === BlankSquare
			if (
				columnOfFour.every(
					(square) =>
						currentColorArrangement[square] === decidedColor &&
						!isBlank
				)
			) {
				setScoreDisplay((score) => score + 4)
				columnOfFour.forEach(
					(square) => (currentColorArrangement[square] = BlankSquare)
				)
				return true
			}
		}
	}, [currentColorArrangement])

	const checkForRowOfThree = useCallback(() => {
		for (let i = 0; i < 64; i++) {
			const rowOfThree = [i, i + 1, i + 2]
			const decidedColor = currentColorArrangement[i]
			const notValid = [
				6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
			]
			const isBlank = currentColorArrangement[i] === BlankSquare

			if (notValid.includes(i)) continue

			if (
				rowOfThree.every(
					(square) =>
						currentColorArrangement[square] === decidedColor &&
						!isBlank
				)
			) {
				setScoreDisplay((score) => score + 3)

				rowOfThree.forEach(
					(square) => (currentColorArrangement[square] = BlankSquare)
				)
				return true
			}
		}
	}, [currentColorArrangement])

	const checkForRowOfFour = useCallback(() => {
		for (let i = 0; i < 64; i++) {
			const rowOfFour = [i, i + 1, i + 2, i + 3]
			const decidedColor = currentColorArrangement[i]
			const notValid = [
				5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46,
				47, 53, 54, 55, 62, 63, 64,
			]

			if (notValid.includes(i)) continue
			const isBlank = currentColorArrangement[i] === BlankSquare

			if (
				rowOfFour.every(
					(square) =>
						currentColorArrangement[square] === decidedColor &&
						!isBlank
				)
			) {
				setScoreDisplay((score) => score + 4)

				rowOfFour.forEach(
					(square) => (currentColorArrangement[square] = BlankSquare)
				)
				return true
			}
		}
	}, [currentColorArrangement])

	const moveIntoSquareBelow = useCallback(() => {
		for (let i = 0; i < 64 - width; i++) {
			const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
			const isFirstRow = firstRow.includes(i)

			if (isFirstRow && currentColorArrangement[i] === BlankSquare) {
				let randomNumber = Math.floor(
					Math.random() * candyColors.length
				)
				currentColorArrangement[i] = candyColors[randomNumber]
			}

			if (currentColorArrangement[i + width] === BlankSquare) {
				currentColorArrangement[i + width] = currentColorArrangement[i]
				currentColorArrangement[i] = BlankSquare
			}
		}
	}, [currentColorArrangement])

	const dragStart = (e) => {
		console.log('drag start', e.target)
		setSquareBeingDragged(e.target)
	}

	const dragDrop = (e) => {
		console.log('drag drop', e.target)
		setSquareBeingReplaced(e.target)
	}

	const dragEnd = (e) => {
		console.log('drag end', e.target)
		const squareBeingDraggedId = parseInt(
			squareBeingDragged.getAttribute('data-id')
		)

		if (!squareBeingReplaced) return
		const squareBeingReplacedId = parseInt(
			squareBeingReplaced.getAttribute('data-id')
		)

		console.log({ squareBeingDraggedId, squareBeingReplacedId })
		const validMoves = [
			squareBeingDraggedId - 1,
			squareBeingDraggedId - width,
			squareBeingDraggedId + 1,
			squareBeingDraggedId + width,
		]
		const validMove = validMoves.includes(squareBeingReplacedId)

		if (validMove) {
			currentColorArrangement[squareBeingReplacedId] =
				squareBeingDragged.getAttribute('src')
			currentColorArrangement[squareBeingDraggedId] =
				squareBeingReplaced.getAttribute('src')
		}

		const isColumnOfFour = checkForColumnOfFour()
		const isRowOfFour = checkForRowOfFour()
		const isColumnOfThree = checkForColumnOfThree()
		const isRowOfThree = checkForRowOfThree()

		if (
			validMove &&
			squareBeingReplacedId &&
			(isColumnOfFour || isRowOfFour || isColumnOfThree || isRowOfThree)
		) {
			console.log('inside validMove')
			setSquareBeingDragged(null)
			setSquareBeingReplaced(null)
		} else {
			console.log('inside INvalidMove')
			setScoreDisplay((score) => score - 5)

			// currentColorArrangement[squareBeingReplacedId] =
			// 	squareBeingReplaced.getAttribute('src')
			// currentColorArrangement[squareBeingDraggedId] =
			// 	squareBeingDragged.getAttribute('src')
		}

		console.log({ scoreDisplay })
	}

	const createBoard = useCallback(() => {
		const randomColorArrangement = []

		for (let i = 0; i < width * width; i++) {
			const randomNumberFrom0To5 = Math.floor(
				candyColors.length * Math.random()
			)
			const randomColor = candyColors[randomNumberFrom0To5]
			randomColorArrangement.push(randomColor)
		}
		setCurrentColorArrangement(randomColorArrangement)
	}, [])

	useEffect(() => {
		createBoard()
	}, [createBoard])

	useEffect(() => {
		const timer = setInterval(() => {
			checkForColumnOfFour()
			checkForRowOfFour()
			checkForColumnOfThree()
			checkForRowOfThree()
			moveIntoSquareBelow()
			setCurrentColorArrangement([...currentColorArrangement])
		}, 100)
		return () => clearInterval(timer)
	}, [
		checkForColumnOfFour,
		checkForRowOfFour,
		checkForColumnOfThree,
		checkForRowOfThree,
		moveIntoSquareBelow,
		currentColorArrangement,
	])

	return (
		<div className='app'>
			<div className='game'>
				{currentColorArrangement.map((candyColor, index) => (
					<img
						src={candyColor}
						key={index}
						alt={candyColor}
						data-id={index}
						draggable={true}
						onDragStart={dragStart}
						onDragOver={(e) => e.preventDefault()}
						onDragEnter={(e) => e.preventDefault()}
						onDragLeave={(e) => e.preventDefault()}
						onDrop={dragDrop}
						onDragEnd={dragEnd}
					/>
				))}
			</div>
		</div>
	)
}

export default App
