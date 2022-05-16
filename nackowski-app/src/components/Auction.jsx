import { Button, Card } from 'react-bootstrap';
import React from 'react';

const Auction = ({ auction, endDate, handleClick, removeAuction, handleUpdateClick }) => {
  let right = {
    float: "right"
  };
  let mid = {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center"
  };
  let card = {
    height: "31%",
    minHeight: "300px",
    width: "24rem",
    margin: "20px",
    float: "left"
  };
  let btn = {
    width: "33%",
    margin: "0.5px"

  }
  return (
    <div className="container-md-2" >

      <Card style={card}>
        <Card.Header>
          <Card.Title>{auction.Titel}</Card.Title>
          <Card.Title><span style={right}>{endDate}</span></Card.Title>
        </Card.Header>
        <Card.Body>
          {auction.aktiv === "Aktiv" ? <div className='card-price2'>
            <Card.Text >Utropspris:   {auction.Utropspris}kr</Card.Text>
          </div>
            :
            <div className='card-price'>
              <Card.Text >Utropspris:   {auction.Utropspris}kr</Card.Text>
            </div>}
          <Card.Text style={mid} >{auction.Beskrivning}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Text>{auction.SkapadAv}<span style={right}>{auction.aktiv}</span></Card.Text>
        </Card.Footer>
        <div className='container-md-3'>
          <Button style={btn} className='btn btn-dark' onClick={() => handleClick(auction)} >Detaljer</Button>
          {auction.aktiv === "Aktiv" && <Button style={btn} className='btn btn-dark' onClick={() => removeAuction(auction)} >Ta bort</Button>}
          {auction.aktiv === "Aktiv" && <Button style={btn} className='btn btn-dark' onClick={() => handleUpdateClick(auction)} >Uppdatera</Button>}
        </div>
      </Card>
    </div >
  );
};

export default Auction;