import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MyNavbar() {
    return (
        <div className="my-navbar">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Eloquent</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/play">Play</Nav.Link>
                            <Nav.Link href="/categories">Categories</Nav.Link>
                            <Nav.Link href="/words">Words</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default MyNavbar;

