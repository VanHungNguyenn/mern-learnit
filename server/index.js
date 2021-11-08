const express = require('express')
const app = express()
var bodyParser = require('body-parser')
require('dotenv').config()
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const cors = require('cors')

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
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const port = process.env.POST || 3001

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})
