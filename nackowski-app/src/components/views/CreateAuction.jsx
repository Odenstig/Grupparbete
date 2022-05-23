import dayjs from 'dayjs';
import React, { useRef } from 'react'
import { Button, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';
import './styles/FormStyle.css';
import Navigation from '../navigation/Navigation';

const CreateAuction = () => {
  const title = useRef();
  const price = useRef();
  const name = useRef();
  const endDate = useRef();
  const description = useRef();
  const navigate = useNavigate();

  let dateNow = dayjs();

  const postAuction = async () => {
    let auction = {
      "Titel": title.current.value,
      "Beskrivning": description.current.value,
      "StartDatum": dateNow,
      "SlutDatum": endDate.current.value,
      "Utropspris": price.current.value,
      "AnvändarID" : localStorage.getItem('user-id')      
    }

    let url = "https://localhost:7203/api/auction";

//     var isExpired = false;
//     const token = localStorage.getItem('id_token');
//     var decodedToken=jwt.decode(token, {complete: true});
//     var dateNow = new Date();

// if(decodedToken.exp < dateNow.getTime())
    // isExpired = true;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(auction),
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('id-token'),
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        console.log(data + ' posten är skapad');
      })
      .catch(err => console.log(err));
    navigate('/');
  }

  return (<>
    <Navigation/>
    <Container className='formContainer'>
      <Form id="form">

        <Form.Label>Titel</Form.Label>
        <Form.Control placeholder='Titel' ref={title} />
        <br />

        <Form.Label>Beskrivning</Form.Label>
        <Form.Control as="textarea" placeholder='Beskrivning' rows={4} ref={description} />
        <br />

        <Form.Label>Pris</Form.Label>
        <Form.Control placeholder='Pris' ref={price} />
        <br />

        <Form.Label>Slutdatum</Form.Label>
        <Form.Control type="date" placeholder='Slutdatum' ref={endDate} />
        <br />

        <Button onClick={postAuction} className='btn btn-dark float-end'>Skapa auktion</Button>

      </Form>

    </Container >
    </>
  );
};

export default CreateAuction;