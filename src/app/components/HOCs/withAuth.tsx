import React from 'react'
import { Route, Redirect } from "react-router-dom";

export const withAuth = (Component: any, url: string) => {
    const AuthRoute = () => {
        const isAuth = !!localStorage.getItem('userData');
        if (isAuth) {
            return <Route exact path={url} component={Component} />
        } else {
            return <Redirect to='/' />;
        }
    };

    return AuthRoute;
}