import { LinkContainer } from 'react-router-bootstrap';
import { Nav,Navbar } from "react-bootstrap";

const Navigation = () =>{

    return(<>
        {/* <nav>
            <ul>
                <li><NavLink to="/">Hem</NavLink></li>
                <li><NavLink to="/create">Skapa Auktion</NavLink></li>
            </ul>

        </nav> */}

        <Navbar bg="light" expand="1g">
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer><Nav.Link>CreateAuction</Nav.Link></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    
    </>);

};

export default Navigation;