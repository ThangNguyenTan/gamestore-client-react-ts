import React, { FC } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../state/reducers'

const NavigationBarComponent: FC = () => {
    const { currentUser } = useSelector((state: RootState) => state.authReducer)

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link className="navbar-brand" to="/">
                    Game Store
                </Link>
                <Nav className="ml-auto">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                    {currentUser ? (
                        <>
                            <Link className="nav-link" to="/library">
                                Library
                            </Link>
                            <Link className="nav-link" to="/wishlist">
                                Wishlist
                            </Link>
                            <Link className="nav-link text-danger" to="/logout">
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/signin">
                                Sign In
                            </Link>
                            <Link className="nav-link" to="/signup">
                                Sign Up
                            </Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBarComponent
