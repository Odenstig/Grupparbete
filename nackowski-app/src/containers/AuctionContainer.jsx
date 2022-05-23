import React, { useEffect, useState } from 'react';
import AuctionList from '../components/AuctionList';
import Search from '../components/Search';
import { Container, Row, Col } from 'react-bootstrap'
import dayjs from 'dayjs';
import Navigation from '../components/navigation/Navigation';
import { Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AuctionContainer = () => {
    let right = {
        float: "right",
        backgroundColor: "Black",
        borderColor: "Gray"
      };
      let white = {
          color: "white"
      }
    const [auctionList, setAuctionList] = useState([]);
    const [requestData, setRequestData] = useState(dayjs());
    const [loader, setLoaderState] = useState(true);
    const [isExpired, setIsExpired] = useState(false);
    const [loggedIn, setLoggedin] = useState(false);

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
    
    const logOut = async () => {
        localStorage.clear();
        localStorage.setItem('loggedin','false')
        setLoggedin('false')
    }
    
    useEffect(()=>{
    },[loggedIn])

    useEffect(() => {
        const token = localStorage.getItem('id-token');
        if (token) {
            setIsExpired(true);
            setLoaderState(false)
        }       
        
    }, [])

    return (
        <>
            <Navigation isExpired={setIsExpired} />
            {!loader ? <Container className='p-0'>
            {localStorage.getItem('loggedin') === 'true' ? <Button style={right} onClick={logOut}><LinkContainer style={white} to="/"><Nav.Link>Logga ut</Nav.Link></LinkContainer></Button>:

            <Button style={right}><LinkContainer style={white} to="/login"><Nav.Link style={white}>Logga in</Nav.Link></LinkContainer></Button>
    }
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