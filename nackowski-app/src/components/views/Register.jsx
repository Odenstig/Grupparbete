import React, { useRef } from 'react'
import { Button, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';
import './styles/FormStyle.css';

const Register = () => {
  const username = useRef();
  const password = useRef();

  const navigate = useNavigate();


  const register = async () => {
    let user = {
      "Username": username.current.value,
      "Password": password.current.value,
    }

    // let url = "https://nackowskiapiapi20220519103545.azurewebsites.net/api/authenticate/register"; //Ändra denna URL
    let url = "https://localhost:7203/api/authenticate/register";
    // https://secure-badlands-04420.herokuapp.com/
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            }
          })
            .then(data => {
              console.log(data + ' Användaren är skapad');
            })
            .catch(err => console.log(err));
          navigate('/');
    } catch (error) {
        console.log(error.value)
    }
    
  }

  return (
    <Container className='registerContainer'>
      <Form id="form">

        <Form.Label>Användarnamn</Form.Label>
        <Form.Control placeholder='Username' ref={username} />
        <br />

        <Form.Label>Lösenord</Form.Label>
        <Form.Control type="password" placeholder='Password' ref={password} />
        <br />

        <Button onClick={register} className='btn btn-dark float-end'>Registrera</Button>

      </Form>

    </Container >
  );
};

export default Register;