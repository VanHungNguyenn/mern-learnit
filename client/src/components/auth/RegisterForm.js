import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
	// context
	const { registerUser } = useContext(AuthContext)

	// local satate
	const [registerForm, setRegiterForm] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	})

	const [alert, setAlert] = useState(null)

	const onChangeRegisterForm = (e) => {
		setRegiterForm({ ...registerForm, [e.target.name]: e.target.value })
	}

	const { username, password, confirmPassword } = registerForm

	const register = async (event) => {
		event.preventDefault()

		if (password !== confirmPassword) {
			setAlert({ type: 'danger', message: 'Password do not match' })
			setTimeout(() => setAlert(null), 3000)
			return
		}

		try {
			const registerData = await registerUser(registerForm)

			if (!registerData.success) {
				setAlert({ type: 'danger', message: registerData.message })
				setTimeout(() => setAlert(null), 3000)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Form onSubmit={register}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						onChange={onChangeRegisterForm}
						value={username}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						onChange={onChangeRegisterForm}
						value={password}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						required
						onChange={onChangeRegisterForm}
						value={confirmPassword}
					/>
				</Form.Group>
				<Button variant='info' type='submit' className='mt-2'>
					Register
				</Button>
			</Form>
			<p className='mt-2'>
				Already have an account?
				<Link to='/login'>
					<Button variant='success' size='sm'>
						Login
					</Button>
				</Link>
			</p>
		</>
	)
}

export default RegisterForm
