import { Container, Nav, Navbar } from 'react-bootstrap'

function NavBar() {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src='http://assets.stickpng.com/images/5a05b6b79cf05203c4b6045f.png' width="15%" alt="logo" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/personajes">Personajes</Nav.Link>
                        <Nav.Link href="/lugares">Lugares</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
        </>
    )
}

export default NavBar;