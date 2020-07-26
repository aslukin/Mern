import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { LinksPage } from './Pages/LinksPage';
import { CreatePage } from './Pages/CreatePage';
import { DetailPage } from './Pages/DetailPage';
import { AuthPage } from './Pages/AuthPage';

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path = "/links" exact>
                    <LinksPage />
                </Route>
                <Route path = "/create" exact>
                    <CreatePage />
                </Route>
                <Route path = "/details/:id" >
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        );
    }


    // Not authnticated
    return(
        <Switch>
            <Route path ="/">
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};