import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
	const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
		useContext(PostContext)

	// state
	const [newPost, setNewPost] = useState({
		title: '',
		description: '',
		url: '',
		status: 'TO LEARN',
	})

	const { title, description, url } = newPost

	const onChangeNewPostForm = (event) =>
		setNewPost({ ...newPost, [event.target.name]: event.target.value })

	const resetAddPostData = () => {
		setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
		setShowAddPostModal(false)
	}

	const closeModal = () => {
		resetAddPostData()
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		const { success, message } = await addPost(newPost)
		resetAddPostData()
		setShowToast({
			show: true,
			message,
			type: success ? 'success' : 'danger',
		})
	}

	return (
		<Modal show={showAddPostModal} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to learn?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group className='mb-3'>
						<Form.Control
							type='text'
							placeholder='Title...'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeNewPostForm}
						/>
						<Form.Text className='mt-1' id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Description...'
							name='description'
							value={description}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL...'
							name='url'
							value={url}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeModal}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						LearnIt!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddPostModal
