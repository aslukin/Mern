import React from 'react';
import { Link } from 'react-router-dom';

export const LinkList = ({ links }) => {

    if (!links.length) {
        return (
            <p>No links found</p>
        )
    }

    return (
        <div>
            <table className="highlight">
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>from</th>
                        <th>to</th>
                        <th>goto link</th>
                        <th>clicks</th>
                        <th>date</th>
                    </tr>
                </thead>

                <tbody>
                    {links.map((link, index) => {
                        return (
                            <tr key = {link._id}>
                                <td>{index + 1}</td>
                                <td>{link.from}</td>
                                <td>{link.to}</td>
                                <td>
                                    <Link to={`/detail/${link._id}`}>view details</Link>
                                </td>
                                <td>{link.clicks}</td>
                                <td>{new Date(link.date).toLocaleDateString()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}