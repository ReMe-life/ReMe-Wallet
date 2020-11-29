import React from 'react'
import CopyIcon from '../../../assets/svg/copy.svg'

export const DashboardRender = function (context: any) {
    return (
        <section className='home-wrapper'>
            <div className='tokens-wrapper'>
                <p> Your ReMC balance&nbsp;&nbsp;&nbsp;<strong>ReMC {context.state.tokensBalance}</strong></p>
                <p> Your ETH balance&nbsp;&nbsp;&nbsp;<strong>ETH {context.state.ethBalance}</strong></p>
            </div>
            <dl className='referral-titles'>
                <dt>Referral Code</dt>
                <dd><a href='#'>ReMe Referal Platform</a></dd>
            </dl>
            <div className='input-wrapper'>
                <input type='text' value={context.state.referralLink} />
                <img src={CopyIcon} alt='Show/hide password' />
            </div>
        </section>
    )
}
