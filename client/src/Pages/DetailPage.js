import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

export const DetailPage = () => {
    const {tocken} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            console.log('GetLink called :>> ');
            const fetched = await request(`api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${tocken}`
                })
                // const fetched = await request(`api/link/${linkId}`, 'GET', null, {
                //     Authorization: `Bearer ${tocken}`


                console.log('fetched :>> ', fetched);
            setLink(fetched);
        } catch (e) {

            console.log('e :>> ', e);
         }
        // setLink(fetched);

    }, [tocken, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if(loading) {
        return <Loader />
    }

    return (
        <div>
            <h1>DetailPage</h1>
            <LinkCard link = {link}/> 
        </div>
    );
}