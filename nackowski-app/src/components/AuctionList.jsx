import React, { useState, useRef } from 'react';
import dayjs from 'dayjs';
import './views/styles/ListStyle.css';
import Auction from './Auction';
import { Button, Form, FormControl, FormGroup, Modal, ModalBody, ModalFooter, Row, Col } from 'react-bootstrap';


const AuctionList = ({ list, setRequestData}) => {

    const [showDetail, setShowDetail] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [auction, setAuction] = useState({});
    const [bidsLi, setBidsLi] = useState([]);
    const [bids, setBids] = useState([]);
    const bidName = useRef();
    const bidSum = useRef();


    const title = useRef();
    const price = useRef();
    const name = useRef();
    const endDate = useRef();
    const description = useRef();

    const closeDetailModal = () => {
        setShowDetail(false);
    };

    const closeUpdateModal = () => {
        setShowUpdate(false);
    };

    const handleUpdateClick = (auction) => {
        let budUrl = "http://nackowskis.azurewebsites.net/api/bud/2400/" + auction.auktionID;
        fetch(budUrl)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    alert("Det går inte att uppdatera auktioner med bud.")

                }
                else {
                    setShowUpdate(true);
                    setAuction(auction);
                }
            });

    }


    const handleClick = (auction) => {
        setAuction(auction);
        setShowDetail(true);

        let url = "http://nackowskis.azurewebsites.net/api/bud/2400/" + auction.auktionID;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setBids(data.reverse());
                let list = data.map(bid => {
                    return (<li>{bid.budgivare} - {bid.summa}kr</li>)
                });
                setBidsLi(list);
            });
    };
    const removeAuction = async (auction) => {

        let budUrl = "http://nackowskis.azurewebsites.net/api/bud/2400/" + auction.auktionID;
        await fetch(budUrl)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    alert("Det går inte att ta bort auktioner med bud.")
                };
            })


        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/" + auction.auktionID;

        await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(auction),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(function (data) {
            console.log('Request success: ', 'posten borttagen');
        }).then(() => setRequestData(dayjs()));
    };

    const updateAuction = async (auction) => {

        let updatedAuction = {
            "AuktionID": auction.auktionID,
            "Titel": title.current.value,
            "Beskrivning": description.current.value,
            "StartDatum": auction.StartDatum,
            "SlutDatum": endDate.current.value,
            "Gruppkod": 2400,
            "Utropspris": price.current.value,
            "SkapadAv": name.current.value
        }

        let budUrl = "http://nackowskis.azurewebsites.net/api/bud/2400/" + auction.auktionID;
        await fetch(budUrl)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    alert("Det går inte att uppdatera auktioner med bud.")
                };
            })
            .then(() => setRequestData(dayjs()));

        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/" + auction.auktionID;

        await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedAuction),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            // .then(response => {response.json(); console.log(response)})
            .then((data) => {
                console.log('Request success: ', 'posten uppdaterad', data);
                console.log(data)
                
                setRequestData(dayjs());
                closeUpdateModal();
            })


        





    };


    const addBid = async () => {

        if ((bids.length > 0 && bidSum.current.value <= bids[0].summa) || (bidSum.current.value < auction.utropspris)) {
            alert("Du kan inte bjuda under nuvarande bud")
            return;
        };

        let url = "http://nackowskis.azurewebsites.net/api/bud/2400";
        let bid = {
            "Summa": bidSum.current.value,
            "AuktionID": auction.auktionID,
            "Budgivare": bidName.current.value
        };

        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(bid),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data + ' budet är lagt');
                closeDetailModal();
            })
            .catch(err => console.log(err));
    };


<<<<<<< HEAD
    const getFinalBid = (bud) => {


        let url = "http://nackowskis.azurewebsites.net/api/bud/2400/" + bud;

        let bud1;
        fetch(url).then(response => response.json())
        .then(data => {
            
            bud1 = data[0].Summa

            data.forEach(sum => {
    
                if(bud1 < sum.Summa)
                {
                    bud1 = sum.Summa;
                }
    
            });
            
            console.log(bud1)
            return bud1;
        })
        
    }
=======
>>>>>>> 809cdea5468cebbbc676523b3949cee95349c2d8

    list = list.sort((a, b) => {
        return (dayjs(b.slutDatum).isAfter(dayjs(a.slutDatum)) ? 1 : -1);
    });

    let auctionList = list.map(auction => {
        let endDate = dayjs(auction.slutDatum).format("YYYY-MM-DD HH:mm")
        let slutDatum = dayjs(auction.slutDatum).format("YYYY-MM-DD HH:mm");
        let currentDate = dayjs().format("YYYY-MM-DD HH:mm");;
<<<<<<< HEAD
        let aktiv = "Aktiv";
        let lastBid = getFinalBid(auction.AuktionID)
=======
        auction.aktiv = "Aktiv";
>>>>>>> 809cdea5468cebbbc676523b3949cee95349c2d8

        if (currentDate > slutDatum) {
            auction.aktiv = "Inaktiv";
        };

        return (
<<<<<<< HEAD
            <div className="container-md-2" >

                <Card style={card}>
                    <Card.Header>
                        <Card.Title>{auction.Titel}<span style={right}>{endDate}</span> </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className='card-price'>
                        <Card.Text >Utropspris:   {lastBid}:-</Card.Text>
                        </div>
                        <Card.Text style={mid} >{auction.Beskrivning}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Text>{auction.SkapadAv}<span style={right}>{aktiv}</span></Card.Text>
                    </Card.Footer>

                    <Button className='btn btn-dark' onClick={() => handleClick(auction)} >Mer</Button>
                </Card>

            </div >
=======
            <Auction key={auction.auktionID} auction={auction} endDate={endDate} handleClick={handleClick}
                removeAuction={removeAuction} handleUpdateClick={handleUpdateClick} />
>>>>>>> 809cdea5468cebbbc676523b3949cee95349c2d8
        );
    });

    return (
        <div>
            {auctionList}
            <Modal show={showDetail} onHide={closeDetailModal} size="lg">
                <Modal.Header closeButton>
                    <Row className="justify-content-between">
                        <Col md={9}>
                            <h3>
                                {auction.Titel}
                            </h3>
                        </Col>
                        <Col md={3}>
                            {bids.length > 0 ? <h3>{bids[0].summa}kr</h3> : <h3>{auction.utropspris}kr</h3>}
                        </Col>
                    </Row>


                </Modal.Header>
                <ModalBody>
                    <Row>
                        <Col>
                            {auction.beskrivning}
                        </Col>
                        <Col>
                            {auction.aktiv === "Aktiv" ? <ul>{bidsLi}</ul> : <ul>{bidsLi[0]}</ul>}
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <FormGroup>
                        <Row>
                        <Col>
                            {auction.aktiv === "Aktiv" && <FormControl type="text" placeholder="Namn" ref={bidName} autoFocus required />}

                            </Col>
                            <Col>
                            {auction.aktiv === "Aktiv" && <FormControl type="text" placeholder="Pris" ref={bidSum} required />}
                            </Col>
                            <Col>
                            {auction.aktiv === "Aktiv" &&<Button className='btn btn-dark' onClick={addBid}>Lägg Bud</Button>}
                            </Col>
                        </Row>

                    </FormGroup>
                </ModalFooter>
            </Modal>



            {/* UPDATE MODAL  */}

            <Modal show={showUpdate} onHide={closeUpdateModal} size="lg">
                <Modal.Header closeButton>
                    <h3>
                        Uppdatera Auktion
                    </h3>
                </Modal.Header>
                <ModalBody>
                    <Row>
                        <Col>
                            <Form.Label>Titel</Form.Label>
                            <Form.Control placeholder='Titel' ref={title} defaultValue={auction.Titel} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Label>Beskrivning</Form.Label>
                            <Form.Control as="textarea" placeholder='Beskrivning' rows={4} ref={description} defaultValue={auction.Beskrivning} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Label>Pris</Form.Label>
                            <Form.Control placeholder='Pris' ref={price} defaultValue={auction.utropspris} />
                        </Col>
                        <Col>
                            <Form.Label>Skapare</Form.Label>
                            <Form.Control placeholder='Skapare' ref={name} defaultValue={auction.skapadAv} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Label>Slutdatum</Form.Label>
                            <Form.Control type="date" defaultValue={dayjs(auction.slutDatum).format("YYYY-MM-DD")} ref={endDate} />
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-dark" onClick={() => updateAuction(auction)}>Uppdatera</Button>
                </ModalFooter>
            </Modal>


        </div >
    );
};

export default AuctionList;