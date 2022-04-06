
import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const CreateAuction = () => {
  const title = useRef();
  const price = useRef();
  const name = useRef();
  const endDate = useRef();
  const description = useRef();





  return (
    <Form >

      <Form.Label>Titel</Form.Label>
      <Form.Control placeholder='Titel' ref={title} />
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

      <Button type='submit'>Skapa auktion</Button>

    </Form>
  );
};

export default CreateAuction;