import React, { useRef,useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';
import './views/styles/FormStyle.css';
import dayjs from 'dayjs';

const LoginButton = () => {
  const username = useRef();
  const password = useRef();
  const [expired, setExpired] = useState(false);
    
  const navigate = useNavigate();


  const login = async () => {
    let user = {
      "Username": username.current.value,
      "Password": password.current.value,
    }

    let url = "https://localhost:7203/api/authenticate/login"; //Ändra denna URL

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data=>{
        localStorage.setItem('id-token', data.token);
        localStorage.setItem('token-exp',data.expiration)
        console.log(data.expiration);
        console.log(data);          
      })
      .catch(err => console.log(err));
    navigate('/')
    setExpired(true)
  }

  return (
    <Container className='loginContainer'>
      <Form id="form">

        <Form.Label>Användarnamn</Form.Label>
        <Form.Control placeholder='Username' ref={username} />
        <br />

        <Form.Label>Lösenord</Form.Label>
        <Form.Control type="password" placeholder='Password' ref={password} />
        <br />

        <Button onClick={login} setExpired={setExpired} className='btn btn-dark float-end'>Login</Button>

      </Form>

    </Container >
  );
};

export default LoginButton;