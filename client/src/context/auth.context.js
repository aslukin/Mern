import {createContext} from 'react';

function noop() {}

export const AuthContext = createContext({
    tocken: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
});