import React from 'react';

const BidList = ({list}) => {
    

        console.log(list)
        let bidlist = list.map(bid => {
            
            
            return (
                <li>{bid.Summa}</li>
                );
            });
            return (
                <ul>{bidlist}</ul>
                );
};

export default BidList;