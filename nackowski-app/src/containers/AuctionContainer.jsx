import React, { useEffect, useState } from 'react';
import AuctionList from '../components/AuctionList';
import Search from '../components/Search';
import { Container, Row, Col } from 'react-bootstrap'
import dayjs from 'dayjs';


const AuctionContainer = () => {

    const [auctionList, setAuctionList] = useState([]);
    const [requestData, setRequestData] = useState(dayjs());
    const [loader, setLoaderState] = useState(true);

    useEffect(() => {
        let url = "https://localhost:7203/api/auction"

        const getData = async () => {
            await fetch(url)
            .then(res => res.json())
            .then(data => {

                let filteredData = data.filter(x => dayjs(x.SlutDatum).format("YYYY-MM-DD HH:mm") > dayjs().format("YYYY-MM-DD HH:mm"));

                setAuctionList(filteredData);
                setLoaderState(false);
            })
        }
        getData();
        
    }, [requestData]);

    const search = async (searchparam) => {


        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/"

        await fetch(url)
            .then(response => response.json())
            .then(data => {

                let list = data.filter(x => x.Titel.toLowerCase().includes(searchparam.toLowerCase()));
                let array = [];
                list.forEach(element => {
                    array.push(element);
                });

                setAuctionList(array);
                setLoaderState(false);
            });

    };


    return (
        <>
            {!loader ? <Container className='p-0'>
                <Row className="justify-content-md-center mx-auto">
                    <Col xs={10} md={12}>
                        <Search callback={search} />
                        <AuctionList list={auctionList} setRequestData={setRequestData} />
                    </Col>

                </Row>
            </Container> : <div className='text-center p-4'><h3>Loading...</h3></div>}
        </>
    );
};

export default AuctionContainer;