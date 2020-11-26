import React from 'react'

export const DashboardRender = function (context: any) {
    return (
        <div className='tokens-wrapper'>
            <p> Referral Link: {context.state.referralLink}</p>
            <p> Your ReMC balance&nbsp;&nbsp;&nbsp;<strong>ReMC {context.state.tokensAmount}</strong></p>
            <p> Your ETH balance&nbsp;&nbsp;&nbsp;<strong>ETH {context.state.ethAmount}</strong></p>
            <p> Earnings&nbsp;&nbsp;&nbsp;</p>
            <div>
                <p>SignUp {context.state.earnedTokens.signup}</p>
                <p>Referral {context.state.earnedTokens.referral}</p>
            </div>
        </div>
    )
}
