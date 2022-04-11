import React, { useState } from 'react';
import { Button, Card, Modal, ModalBody } from 'react-bootstrap';
import dayjs from 'dayjs';
import './views/styles/ListStyle.css';

const AuctionList = ({ list }) => {
    let right = {
        float: "right",
        fontSize: "0.8em"
    };

    const [show, setShow] = useState(false);
    const [auction, setAuction] = useState({});
    const [bids, setBids] = useState();

    const closeModal = () => {
        setShow(false);
    }
    const handleClick = (auction) => {
        setAuction(auction);
        setShow(true);

        let url = "http://nackowskis.azurewebsites.net/api/bud/2400/" + auction.AuktionID;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let list = data.map(bid => {
                    return (<li>{bid.Budgivare} - {bid.Summa}</li>)
                })
                setBids(list.reverse());
            });
    };

    let card = {
        height: "30%",
        minHeight: "300px",
        width: "18rem",
        margin: "20px",
        float: "left"
    };
    list = list.sort((a, b) => {
        return (dayjs(b.SlutDatum).isAfter(dayjs(a.SlutDatum)) ? 1 : -1);
    });
    let auctionList = list.map(auction => {
        let endDate = dayjs(auction.SlutDatum).format("YYYY-MM-DD HH:mm")
        return (
            <div className="container-md-2" >

                <Card style={card}>
                    <Card.Header>
                        <Card.Title>{auction.Titel}</Card.Title>
                        <Card.Title><span style={right}>{endDate}</span></Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{auction.Beskrivning}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Text>{auction.SkapadAv}<span style={right}>{auction.Utropspris}</span></Card.Text>
                    </Card.Footer>

                    <Button className='btn btn-dark' onClick={() => handleClick(auction)} >Mer</Button>
                </Card>

            </div >
        );
    });

    return (
        <div>
            {auctionList}
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    {auction.Titel}
                </Modal.Header>
                <ModalBody>
                    {auction.Beskrivning}
                    <ul>
                        {bids}
                    </ul>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default AuctionList;