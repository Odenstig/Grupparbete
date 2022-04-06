import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from "react-bootstrap";

const Navigation = () => {

    let burger = {
        margin: "0 20px 0 20px",
    }
    let nackowski = {
        margin: "0 10px 0 20px",
    }

    return (<>
        {/* <nav>
            <ul>
                <li><NavLink to="/">Hem</NavLink></li>
                <li><NavLink to="/create">Skapa Auktion</NavLink></li>
            </ul>

        </nav> */}


        <Navbar bg="light" expand="1g">
            <LinkContainer to="/" style={nackowski}>
                <Navbar.Brand href="#home">Nackowski's</Navbar.Brand >

            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={burger}/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={burger}>
                    <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                    <LinkContainer to="/create"><Nav.Link>CreateAuction</Nav.Link></LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    </>);

};

export default Navigation;