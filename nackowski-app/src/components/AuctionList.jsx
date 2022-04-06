import React from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';

const AuctionList = ({list}) => {

    let right = {
        float: "right"
    };

    let card = {
        height: "300px",
        width: "20%",
        margin:"20px",
        float:"left"
    }

    let auctionList = list.map(auction=>{
        return(
        <Card style={card}>
        <Card.Header>
            <Card.Title>{auction.Titel}<span style={right}>{auction.SlutDatum}</span> </Card.Title>
        </Card.Header>
        <Card.Body>
            <Card.Text>{auction.Beskrivning}</Card.Text>
        </Card.Body>
        <Card.Footer>
            <Card.Text>{auction.SkapadAv}<span style={right}>{auction.Utropspris}</span></Card.Text>
        </Card.Footer>

        <Button>Mer</Button>
        </Card>
        );
    });
  return (
    <div>{auctionList}</div>
  );
};

export default AuctionList;