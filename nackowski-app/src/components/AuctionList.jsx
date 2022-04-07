import React,{useState,useEffect} from 'react';
import { Button, Card} from 'react-bootstrap';
import dayjs from 'dayjs';
import BidList from '../components/BidList';

const AuctionList = ({ list }) => {
    
    console.log(list)
    const [bidlist,setBidList]=useState([]);
    
    useEffect(()=>{

        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/"+list.AuktionID;

        fetch(url)
        .then(res=>res.json())
        .then(data =>{
            console.log(data)
            setBidList(data);
        })
    },[]);    

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

    let currrentDate = dayjs();
    let aktiv = "Inaktiv";
    let auctionList = list.map(auction => {

        let endDate = dayjs(auction.SlutDatum);
        if (currrentDate < endDate) {
                aktiv = "Aktiv"
        }
        return (
            <div id={auction.AktionsID} className="container-md-2">

            <Card style={card}>
                <Card.Header>
                    <Card.Title>{auction.Titel}<span style={right}>{endDate.format("YYYY-MM-DD HH:mm")}</span> </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{auction.Beskrivning}</Card.Text>
                    <Card.Text>{auction.Utropspris}:-</Card.Text>
                    <Card.Text>{auction.SkapadAv}<span style={right}>{aktiv}</span></Card.Text>

                </Card.Body>
                <Card.Footer>
                    
                </Card.Footer>
                <Button >Mer</Button>
                <BidList list = {bidlist}/>
            </Card>
            </div>
        );
    });
    return (
        <div>{auctionList.reverse()}</div>
    );
};

export default AuctionList;