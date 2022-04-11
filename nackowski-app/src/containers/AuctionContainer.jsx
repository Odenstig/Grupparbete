import React, { useEffect, useState } from 'react';
import AuctionList from '../components/AuctionList';
import Search from '../components/Search';
import { Container, Row, Col } from 'react-bootstrap'
import dayjs from 'dayjs';


const AuctionContainer = () => {

    const [auctionList, setAuctionList] = useState([]);
    const [bidList,setBidList] = useState([]);

    useEffect(() => {
        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/"

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                let filteredData = data.filter(x=>dayjs(x.SlutDatum).format("YYYY-MM-DD HH:mm") > dayjs().format("YYYY-MM-DD HH:mm"));

                setAuctionList(filteredData);
            })
        
    },[]);

    const search = (searchparam) => {


        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/"

        fetch(url)
        .then(response => response.json())
        .then(data => {
            
            let list = data.filter(x=>x.Titel.toLowerCase().includes(searchparam.toLowerCase()));
            let array = [];
            list.forEach(element => {
                array.push(element);
            });

            console.log(list)
            setAuctionList(array);
        });

    };

    return (
        <>
            <Container className='p-0'>
                <Row className="justify-content-md-center mx-auto">
                    <Col xs={10} md={12}>
                        <Search callback={search} />
                        <AuctionList list = {auctionList}/> 
                    </Col>
                    
                </Row>
            </Container>
        </>
    );
};

export default AuctionContainer;