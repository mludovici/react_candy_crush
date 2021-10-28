const PORT = 8080
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())

const cassandraAxiosInstance = axios.create({
	//baseURL: 'https://some-domain.com/api/',
	timeout: 3000,
	headers: {
		accepts: 'application/json',
		'X-Cassandra-Token': process.env.ASTRA_TOKEN,
		'Content-Type': 'application/json',
	},
})

app.get('/', (req, res) => {
	res.json('this is our backend')
})

app.get('/scores', (req, res) => {
	const options = {
		method: 'GET',
		headers: {
			accepts: 'application/json',
			'X-Cassandra-Token': process.env.ASTRA_TOKEN,
		},
	}
	cassandraAxiosInstance(`${process.env.URL}?page-size=20`, options)
		.then((response) => res.status(200).json(response.data))
		.catch((err) => res.status(500).json({ message: err }))
})

app.post('/addscore', (req, res) => {
	const body = req.body

	const options = {
		method: 'POST',
		data: body,
	}
	cassandraAxiosInstance(process.env.URL, options)
		.then((response) => res.status(200).json(response.data))
		.catch((err) => res.status(500).json({ message: err }))
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
