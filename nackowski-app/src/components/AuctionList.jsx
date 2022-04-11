import React, { useState, useRef } from 'react';
import { Button, Card, FormControl, FormGroup, Modal, ModalBody, ModalFooter, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import './views/styles/ListStyle.css';

const AuctionList = ({ list }) => {
    let right = {
        float: "right"
    };

    const [show, setShow] = useState(false);
    const [auction, setAuction] = useState({});
    const [bids, setBids] = useState();
    const bidName = useRef();
    const bidSum = useRef();
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
                    return (<li>{bid.Budgivare} - {bid.Summa}kr</li>)
                })
                setBids(list.reverse());
            });
    };
    const addBid = () => {
        let url = "http://nackowskis.azurewebsites.net/api/bud/2400";
        let bid = {
            "Summa": bidSum.current.value,
            "AuktionID": auction.AuktionID,
            "Budgivare": bidName.current.value
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(bid),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data + ' budet är lagt');
                closeModal();
            })
            .catch(err => console.log(err));
    }
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
                        <Card.Title>{auction.Titel}<span style={right}>{endDate}</span> </Card.Title>
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
            <Modal show={show} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <h3>
                        {auction.Titel}
                    </h3>
                </Modal.Header>
                <ModalBody>
                    <Row>
                        <Col>
                            {auction.Beskrivning}
                        </Col>
                        <Col>
                            <ul>
                                {bids}
                            </ul>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <FormGroup>
                        <Row>
                            <Col>
                                <FormControl type="text" placeholder="Namn" ref={bidName} autoFocus />

                            </Col>
                            <Col>
                                <FormControl type="text" placeholder="Pris" ref={bidSum} />
                            </Col>
                            <Col>
                                <Button className='btn btn-dark' onClick={addBid}>Lägg Bud</Button>
                            </Col>
                        </Row>

                    </FormGroup>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default AuctionList;