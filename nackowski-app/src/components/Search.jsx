import {useRef} from 'react';

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

    //kommenterat över skräp nedan

    // const searchVal = useRef();
    // const[auctionItem, setAuctionItem] = useState({Title:""});

    // const getAuktionItem = () => {

    //     let id = searchVal.current.value;
    //     let url = 

    //     fetch(url)
    //     .then(response => response.json())
    //     .then(data => {

    //         const{title} = data;
    //         let item = {Title: title};
    //         setAuctionItem(item);
    //     });
    // };

    const searchVal = useRef();

    return(
        <div style={searchBox}>
            <input type="text" ref={searchVal} style={text} placeholder="Sök.."/>
            <button style={button} className="btn btn-dark" onClick ={ () => callback(searchVal.current.value)}>Sök</button>
        </div>);
};

export default Search;