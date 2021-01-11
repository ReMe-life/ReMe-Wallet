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

            <dl className='referral-titles'>
                <dt>Earn bonus ReMC tokens when you invite friends and family.</dt>
                <dt>Just copy and share the link below.</dt>
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

            <div className='wallet-title'>
                <span className='message'>
                    Your Wallet Balance
                </span>
                <span className="line"></span>
            </div>

            <div className='tokens-claimed-wrapper'>
                <p className="one-flex-item">
                    <div><strong>ReMC's claimed and available now</strong></div>
                    {/* <div>Your ReMC balance&nbsp;&nbsp;&nbsp;<strong>ReMC {context.state.tokensBalance.formatted}</strong></div> */}
                    <ul className='token-details'>
                        {/* <li><span>SignUp bonus</span><strong>{context.state.earnedTokens.signup}</strong></li> */}
                        <li><span>Available ReMCs</span><span className="tokens-total-amount">{context.state.earnedTokens.referral}</span></li>
                    </ul>
                </p>
                <p className="one-flex-item">
                    <div><strong>Your ETH balance&nbsp;&nbsp;&nbsp;</strong></div>
                    <ul className='token-details'>
                        <li><span>Available ETH</span><span className="tokens-total-amount">{context.state.ethBalance.formatted}</span></li>
                    </ul>
                </p>
            </div>

            <div className='tokens-for-claiming-wrapper'>
                <p className="one-flex-item">
                    <div><strong>ReMC's ready to be claimed:</strong></div>
                    <ul className='token-details'>
                        <li><span>SignUp bonus</span>{context.state.earnedTokens.signup}</li>
                        <li><span>From referrals</span>{context.state.earnedTokens.referral}</li>
                        <li><span></span><span className="tokens-total-amount">15.0000</span></li>
                    </ul>
                </p>
            </div>


        </section>
    )
}
