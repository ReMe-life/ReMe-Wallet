import React from 'react'

export const DashboardRender = function (context: any) {
    return (
        <div className='tokens-wrapper'>
            <p> Your ReMC balance&nbsp;&nbsp;&nbsp;<strong>ReMC {context.state.tokensAmount}</strong></p>
            <p> Your ETH balance&nbsp;&nbsp;&nbsp;<strong>ETH {context.state.ethAmount}</strong></p>
        </div>
    )
}
