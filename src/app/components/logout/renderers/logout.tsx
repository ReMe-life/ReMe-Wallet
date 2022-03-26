import React from 'react'

export const LogoutRender = function (context: any) {
    return (
        <>
            &nbsp;<button className="btn secondary" onClick={context.logout}>Logout</button>
        </>
    )
}
