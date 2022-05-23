import React from 'react';
import { Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const LogOut=()=>{
    let right = {
        float: "right",
        backgroundColor: "Black",
        borderColor: "Gray"
      };
    const logOut = () => {

        localStorage.removeItem("loggedin");
    }
    return (<>
        <Button style={right} onClick={logOut}><LinkContainer to="/"><Nav.Link>Logga ut</Nav.Link></LinkContainer></Button>
    </>
    );
}

export default LogOut;