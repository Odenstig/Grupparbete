import {useState, useRef} from 'react';
import AuctionItem from './AuctionList';

const Search = ({callback}) => {

    let searchBox = {
        margin: "20px"
    }
    let text = {
        "border-radius": "5px",
        "margin-right": "5px",
        padding: "2px 0 2px 4px"
    }
    let button = {
        "margin-left": "-16px",
        "margin-top": "-2px",
        "padding": "4px 10px",
        color: "white",
        "border-style": "none",
    }

    const searchVal = useRef();
    const[auctionItem, setAuctionItem] = useState({Title:""});

    const getAuktionItem = () => {

        let id = searchVal.current.value;
        let url = "http://nackowskis.azurewebsites.net/api/Auktion/2400" + id;

        fetch(url)
        .then(response => response.json())
        .then(data => {

            const{title} = data;
            let item = {Title: title};
            setAuctionItem(item);
        });
    };


    return(
        <div style={searchBox}>
            <input type="text" ref={searchVal} style={text} placeholder="Sök.."/>
            <button style={button} className="btn btn-dark" onClick = {getAuktionItem}>Sök</button>
            <AuctionItem callback = {auctionItem} />
        </div>);
};

export default Search;