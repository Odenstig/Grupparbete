import React, { useEffect, useState } from 'react';
import AuctionList from '../components/AuctionList';
import Search from '../components/Search';

const AuctionContainer = () => {

    const [auctionList, setAuctionList] = useState([]);

    useEffect(() => {
        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/"

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAuctionList(data);
            })
    });

    const search = (searchparam) => {
        // let url ="https://swapi.dev/api/people/?search=" + searchparam;

        // fetch(url)
        // .then(response=>response.json())
        // .then(data=>{

        //     setAuctionList(data);
        // });
    };

    const getDetails = (id) => {

        let url = "http://nackowskis.azurewebsites.net/api/bud/2400/" + id;

    }

    return (
        <>
            <Search callback={search} />
            <AuctionList list={auctionList} />
        </>
    );
};

export default AuctionContainer;