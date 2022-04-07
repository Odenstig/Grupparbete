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
    },[]);

    const[auctionItem, setAuctionItem] = useState({Title:""});

    const search = (searchparam) => {


        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400" + searchparam;

        fetch(url)
        .then(response => response.json())
        .then(data => {

            const{title} = data;
            let item = {Title: title};
            setAuctionItem(item);
        });


    };

    const getDetails = (id) => {

        let url = "http://nackowskis.azurewebsites.net/api/bud/2400/" + id;

    }

    return (
        <>
            <Search callback={search} />
            <AuctionList list={auctionList} />
            <AuctionList searchItem={auctionItem} />
        </>
    );
};

export default AuctionContainer;