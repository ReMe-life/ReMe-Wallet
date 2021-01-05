import React from 'react'
import CopyIcon from '../../../assets/svg/copy.svg'
import CopiedIcon from '../../../assets/svg/copied.svg'

export const DashboardRender = function (context: any) {
    return (
        <section className='home-wrapper'>

            <div className='address-wrapper'>
                <p>Your Wallet address &nbsp;&nbsp;&nbsp;<strong>{context.state.address}</strong>
                    {context.state.copiedWalletAddress ?
                        <img src={CopiedIcon} alt='Show/hide' /> :
                        <img src={CopyIcon} alt='Show/hide' onClick={context.copyWalletAddress} />
                    }
                </p>
            </div>

            <div className='tokens-wrapper'>
                <p>
                    <div>Your ReMC balance&nbsp;&nbsp;&nbsp;<strong>ReMC {context.state.tokensBalance.formatted}</strong></div>
                    <ul className='token-details'>
                        <li><span>SignUp bonus</span><strong>{context.state.earnedTokens.signup}</strong></li>
                        <li><span>From referrals</span><strong>{context.state.earnedTokens.referral}</strong></li>
                    </ul>
                </p>
                <p> Your ETH balance&nbsp;&nbsp;&nbsp;<strong>ETH {context.state.ethBalance.formatted}</strong></p>
            </div>
            <dl className='referral-titles'>
                <dt>Earn bonus ReMC tokens when you invite friends and family. Just copy and share the link below.</dt>
            </dl>
            <div className='input-wrapper'>
                <input type='text' value={context.state.referralLink} />
                {context.state.copiedCode ?
                    <img src={CopiedIcon} alt='Show/hide' /> :
                    <img src={CopyIcon} alt='Show/hide' onClick={context.copyReferralCode} />
                }
            </div>

            <div className='referral-link-wrapper'>
                <span className='message'>
                    <strong>Visit the</strong>
                </span>
                <span className='underline' onClick={() => window.open('#')}><strong>ReMe Referral Program</strong></span>
            </div>

        </section>
    )
}
