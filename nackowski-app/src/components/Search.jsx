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
        "border-radius": "5px",
        "background-color": "#0d6efd",
        "padding": "4px 10px 4px 10px",
        "margin": "-15px",
        color: "white",
        "border-style": "none"
    }

    const searchVal = useRef();

    return(
        <div style={searchBox}>
            <input type="text" ref={searchVal} style={text} placeholder="Sök.."/>
            <button style={button} onClick = {() => {callback(searchVal.current.value)}}>Sök</button>
        </div>);
};

export default Search;