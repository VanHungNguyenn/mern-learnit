import React from 'react'
import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import {
	apiUrl,
	POSTS_LOADED_SUCCESS,
	POSTS_LOADED_FAIL,
	ADD_POST,
	DELETE_POST,
	UPDATE_POST,
} from './constants'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
	// state
	const [postState, dispath] = useReducer(postReducer, {
		posts: [],
		postsLoading: true,
	})

	const [showAddPostModal, setShowAddPostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null,
	})

	// get all posts
	const getPosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts`)
			if (response.data.success) {
				dispath({
					type: POSTS_LOADED_SUCCESS,
					payload: response.data.posts,
				})
			}
		} catch (error) {
			dispath({ type: POSTS_LOADED_FAIL })
		}
	}

	// add post
	const addPost = async (newPost) => {
		try {
			const response = await axios.post(`${apiUrl}/posts`, newPost)
			if (response.data.success) {
				dispath({ type: ADD_POST, payload: response.data.post })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	//delete post
	const deletePost = async (postId) => {
		try {
			const response = await axios.delete(`${apiUrl}/posts/${postId}`)
			if (response.data.success) {
				dispath({ type: DELETE_POST, payload: postId })
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	// update post
	const updatePost = async (updatePost) => {
		try {
			const response = await axios.put(
				`${apiUrl}/posts/${updatePost._id}`,
				updatePost
			)
			if (response.data.success) {
				dispath({ type: UPDATE_POST, payload: response.data.post })
			}
			return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	const postContextData = {
		postState,
		getPosts,
		showAddPostModal,
		setShowAddPostModal,
		addPost,
		showToast,
		setShowToast,
		deletePost,
		updatePost,
	}

	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export default PostContextProvider
