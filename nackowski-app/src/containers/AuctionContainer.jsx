import React, { useEffect, useState } from 'react';
import AuctionList from '../components/AuctionList';
import Search from '../components/Search';

const AuctionContainer = () => {

    const [auctionList, setAuctionList] = useState([]);
    const [bidList,setBidList] = useState([]);

    useEffect(() => {
        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400/"

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAuctionList(data);
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
            <Search callback={search} />
            <AuctionList list = {auctionList}/>
        </>
    );
};

export default AuctionContainer;