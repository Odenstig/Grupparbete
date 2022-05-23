import React, { useEffect, useState } from 'react';
import AuctionList from '../components/AuctionList';
import Search from '../components/Search';
import { Container, Row, Col } from 'react-bootstrap'
import dayjs from 'dayjs';
import Navigation from '../components/navigation/Navigation';


const AuctionContainer = () => {

    const [auctionList, setAuctionList] = useState([]);
    const [requestData, setRequestData] = useState(dayjs());
    const [loader, setLoaderState] = useState(true);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        let url = "https://nackowskiapiapi20220519103545.azurewebsites.net/api/auction"

        const getData = async () => {
            await fetch(url)
                .then(res => res.json())
                .then(data => {

                    let filteredData = data.filter(x => dayjs(x.slutDatum).format("YYYY-MM-DD HH:mm") > dayjs().format("YYYY-MM-DD HH:mm"));

                    setAuctionList(filteredData);
                    setLoaderState(false);
                })
        }
        getData();

    }, [requestData]);

    const search = async (searchparam) => {


        let url = "https://nackowskiapiapi20220519103545.azurewebsites.net/api/auction/"

        await fetch(url)
            .then(response => response.json())
            .then(data => {

                let list = data.filter(x => x.titel.toLowerCase().includes(searchparam.toLowerCase()));
                let array = [];
                list.forEach(element => {
                    array.push(element);
                });

                setAuctionList(array);
                setLoaderState(false);
            });

    };


    useEffect(() => {

        const token = localStorage.getItem('id-token');
        if (token) {
            setIsExpired(true);
        }



    }, [])

    return (
        <>
            <Navigation isExpired={setIsExpired} />
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