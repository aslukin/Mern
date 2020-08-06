import React, {useState, useContext, useCallback, useEffect} from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import { Loader } from '../components/Loader';
import { LinkList } from '../components/LinkList';

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();
    const {tocken} = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link/', 'GET', null, {
                Authorization: `Bearer ${tocken}`
            })
            setLinks(fetched);
        } catch (e) {  }

    }, [tocken, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return (
            <Loader />
        );
    }

    return (
        <div>
        { !loading && <LinkList links={links} />}
        </div>
    );
}