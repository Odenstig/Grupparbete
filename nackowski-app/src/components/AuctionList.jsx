import React, { useState, useRef } from 'react';
import { Button, Card, FormControl, FormGroup, Modal, ModalBody, ModalFooter, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import './views/styles/ListStyle.css';
import Auction from './Auction';
import DetailModal from './DetailModal';

const AuctionList = ({ list }) => {

    const [show, setShow] = useState(false);
    const [auction, setAuction] = useState({});
    const [bidsLi, setBidsLi] = useState([]);
    const [bids, setBids] = useState([]);
    const bidName = useRef();
    const bidSum = useRef();
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);




    const closeModal = () => {
        setShow(false);
    };
    const handleClick = (auction) => {
        setAuction(auction);
        setShow(true);

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
        })
    };
    const updateAuction = (auction) => {

        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/" + auction.AuktionID;

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(auction),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(function (data) {
            console.log('Request success: ', 'posten borttagen');
        })
            .then(forceUpdate());
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
                closeModal();
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
                removeAuction={removeAuction} updateAuction={updateAuction} />
        );
    });

    return (
        <div>
            {auctionList}
            <DetailModal show={show} closeModal={closeModal} auction={auction} bids={bids}
                bidsLi={bidsLi} addBid={addBid} bidSum={bidSum} bidName={bidName} />

        </div >
    );
};

export default AuctionList;