import React from 'react'
import CopyIcon from '../../../assets/svg/copy.svg'
import CopiedIcon from '../../../assets/svg/copied.svg'

export const DashboardRender = function (context: any) {
    return (
        <section className='home-wrapper'>
            <div className='address-wrapper'>
                <p>Your address &nbsp;&nbsp;&nbsp;<strong>{context.state.address}</strong></p>
            </div>
            <div className='address-wrapper'>
                <p>Incoming&nbsp;&nbsp;&nbsp;<strong>ReMC {context.state.incomingTokens}</strong></p>
            </div>
            <div className='tokens-wrapper'>
                <p>
                    <div>Your ReMC balance&nbsp;&nbsp;&nbsp;<strong>ReMC {context.state.tokensBalance}</strong></div>
                    <ul className='token-details'>
                        <li><span>SignUp bonus</span><strong>{context.state.earnedTokens.signup}</strong></li>
                        <li><span>From referrals</span><strong>{context.state.earnedTokens.referral}</strong></li>
                    </ul>
                </p>
                <p> Your ETH balance&nbsp;&nbsp;&nbsp;<strong>ETH {context.state.ethBalance}</strong></p>
            </div>
            <dl className='referral-titles'>
                <dt>Don't forget to invite your family and friends</dt>
                <dd><a href='/dashboard'>ReMe Referral Platform</a></dd>
            </dl>
            <div className='input-wrapper'>
                <input type='text' value={context.state.referralLink} />
                {context.state.copiedCode ?
                    <img src={CopiedIcon} alt='Show/hide' /> :
                    <img src={CopyIcon} alt='Show/hide' onClick={context.copyReferralCode} />
                }
            </div>
        </section>
    )
}
