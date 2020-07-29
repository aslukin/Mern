import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [tocken, setTocken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtTocken, id) => {
        setTocken(jwtTocken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, tocken: jwtTocken
        }));
    }, []);


    const logout = useCallback(() => {
        setTocken(null);
        setUserId(null);

        localStorage.removeItem(storageName);

    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.tocken) {
            login(data.tocken, data.userId);
        }
    }, [login])

    return {login, logout, tocken, userId};
}