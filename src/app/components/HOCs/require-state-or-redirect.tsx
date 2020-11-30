import React from 'react'
import { Route, Redirect } from "react-router-dom"

export const requireStateOrRedirectTo = (internalStateProps: string[], componentToShow: any, componentLink: string, redirectLink: string) => {
    const RequireStateRedirectorRoute = (props: any) => {

        for (let i = 0; i < internalStateProps.length; i++) {
            if (!props.history.location.state || !props.history.location.state[internalStateProps[i]]) {
                return <Redirect to={redirectLink} />
            }
        }

        return <Route exact path={componentLink} component={componentToShow} />
    }

    return RequireStateRedirectorRoute
}
