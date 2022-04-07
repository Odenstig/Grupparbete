import {useState, useRef} from 'react';
import Auctionlist from './AuctionList';

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
        "margin-left": "-12px",
        "margin-top": "-5px",
        "padding": "4px 10px",
        color: "white",
        "border-style": "none",
    }

    const searchVal = useRef();
    const[auctionItem, setAuctionItem] = useState({})


    return(
        <div style={searchBox}>
            <input type="text" ref={searchVal} style={text} placeholder="Sök.."/>
            <button style={button} className="btn btn-primary" onClick = {() => {callback(searchVal.current.value)}}>Sök</button>
        </div>);
};

export default Search;