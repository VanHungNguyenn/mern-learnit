const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
require('dotenv').config()
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.gkbku.mongodb.net/mern-learnit?retryWrites=true&w=majority`
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(Error)
		process.exit(1)
	}
}

connectDB()

app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})
