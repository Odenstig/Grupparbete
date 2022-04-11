import { Button, FormControl, FormGroup, Modal, ModalBody, ModalFooter, Row, Col } from 'react-bootstrap';

const DetailModal = ({ show, closeModal, auction, bids, bidsLi, addBid, bidSum, bidName }) => {
    return (
        <>
            <Modal show={show} onHide={closeModal} size="lg">
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
        </>
    );
}

export default DetailModal;