import React, { useState, useRef } from 'react';
import dayjs from 'dayjs';
import './views/styles/ListStyle.css';
import Auction from './Auction';
import { Button, Form, FormControl, FormGroup, Modal, ModalBody, ModalFooter, Row, Col } from 'react-bootstrap';


const AuctionList = ({ list, setRequestData }) => {

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
        let budUrl = "http://nackowskis.azurewebsites.net/api/bud/2400/" + auction.AuktionID;
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

        let url = "http://nackowskis.azurewebsites.net/api/bud/2400/" + auction.AuktionID;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setBids(data.reverse());
                let list = data.map(bid => {
                    return (<li>{bid.Budgivare} - {bid.Summa}kr</li>)
                })
                setBidsLi(list);
            });
    };
    const removeAuction = (auction) => {

        let budUrl = "http://nackowskis.azurewebsites.net/api/bud/2400/" + auction.AuktionID;
        fetch(budUrl)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    alert("Det går inte att ta bort auktioner med bud.")
                };
            });

        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/" + auction.AuktionID;

        fetch(url, {
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
    const updateAuction = (auction) => {

        let updatedAuction = {
            "Titel": title.current.value,
            "Beskrivning": description.current.value,
            "StartDatum": auction.StartDatum,
            "SlutDatum": endDate.current.value,
            "Gruppkod": 2400,
            "Utropspris": price.current.value,
            "SkapadAv": name.current.value,
        }

        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/" + auction.AuktionID;

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedAuction),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((data) => {
                setShowUpdate(false);
                console.log('Request success: ', 'posten uppdaterad', data);

            })
            .catch((error) => {
                console.log('Error: ', error)
                closeDetailModal();

            })

    };


    const addBid = () => {
        if ((bids.length > 0 && bidSum.current.value <= bids[0].Summa) || (bidSum.current.value < auction.Utropspris)) {
            alert("Du kan inte bjuda under nuvarande bud")
            return;
        };
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
                closeDetailModal();
            })
            .catch(err => console.log(err));
    };



    list = list.sort((a, b) => {
        return (dayjs(b.SlutDatum).isAfter(dayjs(a.SlutDatum)) ? 1 : -1);
    });

    let auctionList = list.map(auction => {
        let endDate = dayjs(auction.SlutDatum).format("YYYY-MM-DD HH:mm")
        let slutDatum = dayjs(auction.SlutDatum).format("YYYY-MM-DD HH:mm");
        let currentDate = dayjs().format("YYYY-MM-DD HH:mm");;
        auction.aktiv = "Aktiv";

        if (currentDate > slutDatum) {
            auction.aktiv = "Inaktiv";
        };

        return (
            <Auction auction={auction} endDate={endDate} handleClick={handleClick}
                removeAuction={removeAuction} handleUpdateClick={handleUpdateClick} />
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
                            {bids.length > 0 ? <h3>{bids[0].Summa}kr</h3> : <h3>{auction.Utropspris}kr</h3>}
                        </Col>
                    </Row>


                </Modal.Header>
                <ModalBody>
                    <Row>
                        <Col>
                            {auction.Beskrivning}
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
                                <FormControl type="text" placeholder="Namn" ref={bidName} autoFocus required />

                            </Col>
                            <Col>
                                <FormControl type="text" placeholder="Pris" ref={bidSum} required />
                            </Col>
                            <Col>
                                <Button className='btn btn-dark' onClick={addBid}>Lägg Bud</Button>
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
                            <Form.Control placeholder='Pris' ref={price} defaultValue={auction.Utropspris} />
                        </Col>
                        <Col>
                            <Form.Label>Skapare</Form.Label>
                            <Form.Control placeholder='Skapare' ref={name} defaultValue={auction.SkapadAv} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Label>Slutdatum</Form.Label>
                            <Form.Control type="date" defaultValue={dayjs(auction.SlutDatum).format("YYYY-MM-DD")} ref={endDate} />
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