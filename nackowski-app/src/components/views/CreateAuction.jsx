
import React from 'react'
import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const CreateAuction = () => {
  return (
    <Form >

      <Form.Label>Titel</Form.Label>
      <Form.Control  placeholder='Titel'/>
      <br/>

      <Form.Label>Pris</Form.Label>
      <Form.Control  placeholder='Pris'/>
      <br/>

      <Form.Label>Skapare</Form.Label>
      <Form.Control  placeholder='Skapare'/>
      <br/>

      <Form.Label>Slutdatum</Form.Label>
      <Form.Control type="date"  placeholder='Slutdatum'/>
      <br/>

      <Button type='submit'>Skapa auktion</Button>

    </Form>
  );
};

export default CreateAuction;