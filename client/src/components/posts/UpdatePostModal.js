import React, { useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
	const {
		postState: { post },
		showUpdatePostModal,
		setShowUpdatePostModal,
		updatePost,
		setShowToast,
	} = useContext(PostContext)

	// state
	const [updatedPost, setUpdatedPost] = useState(post)

	useEffect(() => {
		setUpdatedPost(post)
	}, [post])

	const { title, description, url, status } = updatedPost

	const onChangeUpdatePostForm = (event) =>
		setUpdatedPost({
			...updatedPost,
			[event.target.name]: event.target.value,
		})

	// const resetAddPostData = () => {
	// 	setUpdatedPost({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowUpdatePostModal(false)
	// }

	const closeDialog = () => {
		setUpdatedPost(post)
		setShowUpdatePostModal(false)
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		const { success, message } = await updatePost(updatedPost)
		setShowUpdatePostModal(false)
		setShowToast({
			show: true,
			message,
			type: success ? 'success' : 'danger',
		})
	}

	return (
		<Modal show={showUpdatePostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Making progress?</Modal.Title>
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
							onChange={onChangeUpdatePostForm}
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
							onChange={onChangeUpdatePostForm}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL...'
							name='url'
							value={url}
							onChange={onChangeUpdatePostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='select'
							value={status}
							onChange={onChangeUpdatePostForm}
							name='status'
						>
							<option value='TO LEARN'>TO LEARN</option>
							<option value='LEARNING'>LEARNING</option>
							<option value='LEARNED'>LEARNED</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Change
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdatePostModal
