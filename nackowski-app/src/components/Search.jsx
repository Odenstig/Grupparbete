import {useRef} from 'react';

const Search = ({callback}) => {

    const searchVal = useRef();

    return(
        <>
            <input type="text" ref={searchVal}/>
            <button onClick = {() => {callback(searchVal.current.value)}}>Sök</button>
        </>);
};

export default Search;