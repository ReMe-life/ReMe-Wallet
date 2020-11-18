import React from 'react'

export const DashboardRender = function (context: any) {
    return (
        <div>
            <h1> Eth amount: {context.state.ethAmount}</h1>
            <h1> Tokens amount: {context.state.tokensAmount}</h1>
        </div>

    )
}
