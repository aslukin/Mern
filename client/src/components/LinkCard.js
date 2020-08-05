import React from 'react';

export const LinkCard = (link) => {
    return (
        <div>
            <h2>Link info</h2>
            <p>from: </p>
            <p>to: </p>
            <p>code: {link.code} </p>
            <p>clicks: <strong>{link.clicks}</strong> </p>
            <p>date: <strong>{ new Date(link.date).toLocaleDateString}</strong> </p>
        </div>
    );

}


{/* <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a> */}
{/* <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a> */}