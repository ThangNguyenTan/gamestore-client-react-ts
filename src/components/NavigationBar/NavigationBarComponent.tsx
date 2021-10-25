import React, { FC } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavigationBarComponent: FC = () => {
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
                    <Link className="nav-link" to="/signin">
                        Sign In
                    </Link>
                    <Link className="nav-link" to="/signup">
                        Sign Up
                    </Link>
                    <Link className="nav-link" to="/profile">
                        Profile
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBarComponent
