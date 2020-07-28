import {useState, useCallback} from 'react';
// import { json } from 'express';


export const useHttp = () => {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback( async (url, method='GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body){
                body = JSON.stringify(body);
                headers['Content-type'] = 'application/json';
            }
            console.log('body :>> ', body);
            console.log('url :>> ', url);
            console.log('method :>> ', method);
            console.log('headers :>> ', headers);
            const response = await fetch( url, {method, body, headers});
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something is worng');
            }

            setLoading(false);

            return data;

        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback( () => { setError(null) } , []);

    return ({loading, request, error, clearError});
}