import dayjs from 'dayjs';
import React, { useRef } from 'react'
import { Button, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';

const CreateAuction = () => {
  const title = useRef();
  const price = useRef();
  const name = useRef();
  const endDate = useRef();
  const description = useRef();
  const navigate = useNavigate();


  let dateNow = dayjs();

  const postAuction = (e) => {
    let auction = {
      "Titel": title.current.value,
      "Beskrivning": description.current.value,
      "StartDatum": dateNow,
      "SlutDatum": endDate.current.value,
      "Gruppkod": 2400,
      "Utropspris": price.current.value,
      "SkapadAv": name.current.value,
    }

    let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400";

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(auction),
      headers: {
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



  return (
    <Container className="justify-content-md-center">
      <Form id="form">

        <Form.Label>Titel</Form.Label>
        <Form.Control placeholder='Titel' ref={title} size="lg" />
        <br />

        <Form.Label>Beskrivning</Form.Label>
        <Form.Control as="textarea" placeholder='Beskrivning' rows={4} ref={description} />
        <br />

        <Form.Label>Pris</Form.Label>
        <Form.Control placeholder='Pris' ref={price} />
        <br />

        <Form.Label>Skapare</Form.Label>
        <Form.Control placeholder='Skapare' ref={name} />
        <br />

        <Form.Label>Slutdatum</Form.Label>
        <Form.Control type="date" placeholder='Slutdatum' ref={endDate} />
        <br />

        <Button onClick={postAuction}>Skapa auktion</Button>

      </Form>

    </Container >
  );
};

export default CreateAuction;