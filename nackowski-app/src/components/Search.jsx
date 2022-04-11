import { useRef } from 'react';

const Search = ({ callback }) => {

    let searchBox = {
        margin: "20px"
    }
    let text = {
        borderRadius: "5px",
        marginRight: "5px",
        padding: "2px 0 2px 4px"
    }
    let button = {
        marginLeft: "-16px",
        marginTop: "-5px",
        padding: "4px 10px",
        color: "white",
        borderStyle: "none",
    }

    const searchVal = useRef();

    return (
        <div style={searchBox}>
            <input type="text" ref={searchVal} style={text} placeholder="Sök.." />
            <button style={button} className="btn btn-dark" onClick={() => { callback(searchVal.current.value) }}>Sök</button>
        </div>);
};

export default Search;