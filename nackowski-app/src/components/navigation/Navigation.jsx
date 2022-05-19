import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar,Container } from "react-bootstrap";

const Navigation = () => {

    return (<>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <LinkContainer to="/"><Navbar.Brand href="#home">Nackowski</Navbar.Brand></LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                <LinkContainer to="/create"><Nav.Link>CreateAuction</Nav.Link></LinkContainer>
                <LinkContainer to="/register"><Nav.Link>Register</Nav.Link></LinkContainer>      
            </Nav>    
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </>);
};

export default Navigation;