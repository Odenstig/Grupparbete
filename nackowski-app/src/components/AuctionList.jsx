import React from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import dayjs from 'dayjs';

const AuctionList = ({ list }) => {

    let right = {
        float: "right"
    };

    let card = {
        height: "30%",
        minHeight: "300px",
        width: "18rem",
        margin: "20px",
        float: "left"
    }

    let auctionList = list.map(auction => {
        let endDate = dayjs(auction.SlutDatum).format("YYYY-MM-DD HH:mm")
        return (
            <div Class="container-md-2">

            <Card style={card}>
                <Card.Header>
                    <Card.Title>{auction.Titel}<span style={right}>{endDate}</span> </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{auction.Beskrivning}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>{auction.SkapadAv}<span style={right}>{auction.Utropspris}</span></Card.Text>
                </Card.Footer>

                <Button className='btn btn-dark'>Mer</Button>
            </Card>
            </div>
        );
    });
    return (
        <div>{auctionList}</div>
    );
};

export default AuctionList;