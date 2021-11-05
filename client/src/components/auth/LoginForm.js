import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
	// context
	const { loginUser } = useContext(AuthContext)

	// local satate
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: '',
	})

	const [alert, setAlert] = useState(null)

	const onChangeLoginForm = (e) => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
	}

	const { username, password } = loginForm

	const login = async (event) => {
		event.preventDefault()

		try {
			const loginData = await loginUser(loginForm)

			if (loginData.success) {
			} else {
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 3000)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Form onSubmit={login}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit' className='mt-2'>
					Login
				</Button>
			</Form>
			<p className='mt-2'>
				Don't have an account?
				<Link to='/register'>
					<Button variant='info' size='sm'>
						Register
					</Button>
				</Link>
			</p>
		</>
	)
}

export default LoginForm
