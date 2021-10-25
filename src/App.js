import { useState, useEffect, useCallback } from 'react'
import Candy1 from './images/Candy/candy1.png'
import Candy2 from './images/Candy/candy2.png'
import Candy3 from './images/Candy/candy3.png'
import Candy4 from './images/Candy/candy4.png'
import Candy5 from './images/Candy/candy5.png'
import Candy6 from './images/Candy/candy6.png'
import BlankSquare from './images/Star Trek/ex1.png'

const width = 8

const candyimages = [Candy1, Candy2, Candy3, Candy4, Candy5, Candy6]
let starTrekImages = []
let starWarsImages = []

const App = () => {
	const [swColors, setSWColors] = useState(null)
	const [stColors, setSTColors] = useState(null)
	const [candyColors, setCandyColors] = useState([])
	const [currentColorArrangement, setCurrentColorArrangement] = useState([])
	const [squareBeingDragged, setSquareBeingDragged] = useState(null)
	const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
	const [scoreDisplay, setScoreDisplay] = useState(0)

	function importAll(r) {
		let images = {}
		let AllImages = r.keys()

		let candyImages = AllImages.filter((item) => item.includes('Candy'))
		starWarsImages = AllImages.filter((item) => item.includes('Star Wars'))
		starTrekImages = AllImages.filter((item) => item.includes('Star Trek'))

		let cc = candyImages.map(
			(item) => (images[item.replace('./', '')] = r(item).default)
		)
		let st = starWarsImages.map(
			(item) => (images[item.replace('./', '')] = r(item).default)
		)
		let sw = starTrekImages.map(
			(item) => (images[item.replace('./', '')] = r(item).default)
		)

		let stImagesTotalSix = []
		while (stImagesTotalSix.length < 6) {
			let rndImageNumber = Math.floor(Math.random() * st.length)
			let rndImage = st[rndImageNumber]
			if (!stImagesTotalSix.includes(rndImage)) {
				stImagesTotalSix.push(rndImage)
			} else {
				continue
			}
		}

		let swImagesTotalSix = []
		while (swImagesTotalSix.length < 6) {
			let rndImageNumber = Math.floor(Math.random() * sw.length)
			let rndImage = sw[rndImageNumber]
			if (!swImagesTotalSix.includes(rndImage)) {
				swImagesTotalSix.push(rndImage)
			} else {
				continue
			}
		}

		//console.log({ cc, stImagesTotalSix, swImagesTotalSix })
		// r.keys().map((item) => (images[item.replace('./', '')] = r(item)))
		// let img2 = { ...images }
		// console.log(img2)
		return [cc, stImagesTotalSix, swImagesTotalSix]
	}

	useEffect(() => {
		const [candyImages, SWImages, STImages] = importAll(
			require.context('./images', true, /\.(png|jpe?g|svg)$/)
		)
		//console.log({ candyImages, SWImages, STImages })
		setCandyColors(candyImages)
		setSWColors(SWImages)
		setSTColors(STImages)
	}, [])

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
	}, [currentColorArrangement, candyColors])

	const dragStart = (e) => {
		//console.log('drag start', e.target)
		setSquareBeingDragged(e.target)
	}

	const dragDrop = (e) => {
		//console.log('drag drop', e.target)
		setSquareBeingReplaced(e.target)
	}

	const dragEnd = (e) => {
		//console.log('drag end', e.target)
		const squareBeingDraggedId = parseInt(
			squareBeingDragged.getAttribute('data-id')
		)

		if (!squareBeingReplaced) return
		const squareBeingReplacedId = parseInt(
			squareBeingReplaced.getAttribute('data-id')
		)

		//console.log({ squareBeingDraggedId, squareBeingReplacedId })
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
			//console.log('inside validMove')
			setSquareBeingDragged(null)
			setSquareBeingReplaced(null)
		} else {
			//console.log('inside INvalidMove')
			setScoreDisplay((score) => score - 5)

			// currentColorArrangement[squareBeingReplacedId] =
			// 	squareBeingReplaced.getAttribute('src')
			// currentColorArrangement[squareBeingDraggedId] =
			// 	squareBeingDragged.getAttribute('src')
		}

		//console.log({ scoreDisplay })
	}

	const createBoard = useCallback(() => {
		const randomColorArrangement = []
		//console.log({ candyColors })

		for (let i = 0; i < width * width; i++) {
			const randomNumber = Math.floor(candyColors.length * Math.random())
			const randomColor = candyColors[randomNumber]
			randomColorArrangement.push(randomColor)
		}
		setCurrentColorArrangement(randomColorArrangement)
	}, [candyColors])

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
		}, 200)
		return () => clearInterval(timer)
	}, [
		checkForColumnOfFour,
		checkForRowOfFour,
		checkForColumnOfThree,
		checkForRowOfThree,
		moveIntoSquareBelow,
		currentColorArrangement,
		setCandyColors,
	])

	const handleChoice = (e, choice) => {
		//console.log({ choice })
		if (choice === 'Candy') {
			setCandyColors(candyimages)
		} else if (choice === 'Star Wars') {
			//console.log({ swColors })
			setCandyColors(swColors)
		} else if (choice === 'Star Trek') {
			setCandyColors(stColors)
		}
		//console.log('CandyColors after handleChoice: ', { candyColors })
		//createBoard()
	}

	return (
		<div>
			<div className='buttonRow'>
				<button onClick={(e) => handleChoice(e, 'Star Trek')}>
					<img
						src='https://img.icons8.com/wired/64/000000/star-trek-symbol.png'
						alt='Star Trek'
					/>
				</button>
				<button onClick={(e) => handleChoice(e, 'Star Wars')}>
					<img
						src='https://img.icons8.com/ios/50/000000/stormtrooper.png'
						alt='Star Wars'
					/>{' '}
				</button>
				<button onClick={(e) => handleChoice(e, 'Candy')}>
					<img
						src='https://img.icons8.com/color/48/000000/sweets.png'
						alt='Candy'
					/>
				</button>
			</div>
			<div
				style={{
					paddingLeft: '30px',
					paddingTop: '20px',
					fontSize: '20px',
					fontWeight: 'bold',
				}}
			>
				Score: {scoreDisplay}
			</div>
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
		</div>
	)
}

export default App
