import React from 'react';

export const LinkCard = ({ link }) => {


    console.log('link :>> ', link);
    if (!link) {
        return (
            <div>
                <h2>Link info not found</h2>
            </div>
        )
    }

    return (
        <div>
            <h2>Link info    </h2>
            <p>from:   <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a> </p>
            <p>to: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>code: {link.code} </p>
            <p>clicks: <strong>{link.clicks}</strong> </p>
            <p>date: <strong>{new Date(link.date).toLocaleDateString()}</strong> </p>
        </div>
    );

}

