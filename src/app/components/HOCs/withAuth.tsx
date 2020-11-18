import React from 'react'
import { Route, Redirect } from "react-router-dom"

/*
    Redirect to component url in case the user has already been authenticated
    Route to the Auth component in case the user has not been authenticated
*/
export const withAuth = (componentUrl: string, AuthComponent: any, authUrl: string) => {
    const AuthRoute = () => {
        if (hasBeenAuthenticated()) {
            return <Redirect to={componentUrl} />
        }

        return <Route exact path={authUrl} component={AuthComponent} />
    }

    return AuthRoute
}

/*
    Redirect to auth component in case the user has not been authenticated
    Route to the requested component in case the user has been authenticated
*/
export const withoutAuth = (authUrl: string, Component: any, componentUrl: string) => {
    const WithoutAuthRoute = () => {
        if (hasBeenAuthenticated()) {
            return <Route exact path={componentUrl} component={Component} />
        }

        return <Redirect to={authUrl} />
    }

    return WithoutAuthRoute
}

const hasBeenAuthenticated = () => {
    return !!localStorage.getItem('userData')
}

