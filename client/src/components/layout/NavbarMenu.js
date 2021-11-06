import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Logo from '../../assets/vanhung.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const Navbarmenu = () => {
	const {
		authState: {
			user: { username },
		},
		logoutUser,
	} = useContext(AuthContext)

	const logout = () => logoutUser()

	return (
		<Navbar expand='lg' variant='dark' className='shadow navbarMenu'>
			<Navbar.Brand
				to='/dashboard'
				as={Link}
				className='font-weight-bolder text-white'
			>
				<img
					src={Logo}
					alt='learnItLogo'
					height='32'
					className='logo'
				/>
				<span>VanHung - LearnIt</span>
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse
				id='basic-navbar-nav'
				className='d-lg-flex justify-content-between'
			>
				<Nav>
					<Nav.Link
						className='font-weight-bolder text-white text-center'
						to='/dashboard'
						as={Link}
					>
						Dashboard
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white text-center'
						to='/about'
						as={Link}
					>
						About
					</Nav.Link>
				</Nav>
				<Nav className='d-flex align-items-center'>
					<Nav.Link className='text-white welcome-text' disabled>
						Welcome <span>{username}</span>
					</Nav.Link>
					<Button
						variant='secondary'
						className='font-weight-bolder text-white btn-logout'
						onClick={logout}
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='icon-logout'
						/>{' '}
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Navbarmenu
