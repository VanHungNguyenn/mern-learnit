const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// @route POST api/posts
// @desc Create post
// @access Private

router.post('/', async (req, res) => {
	const { title, description, url, status } = req.body
	//simple validation
	if (!title) {
		return res
			.status(500)
			.json({ success: false, message: 'Title is required' })
	}

	try {
		const newPost = new Post({
			title,
			description,
			url: url.startsWith('https://') ? url : `http://${url}`,
			status: status || 'TO LEARN',
			user: '6183ba8c6d10f0270c2d4b37',
		})

		await newPost.save()

		res.json({ success: true, message: 'Happy Learning!', post: newPost })
	} catch (error) {
		console.log(Error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})
