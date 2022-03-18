import React from 'react'
import CopyIcon from '../../../assets/svg/copy.svg'
import CopiedIcon from '../../../assets/svg/copied.svg'

export const DashboardRender = function (context: any) {
    return (
        <>
            <section className='home-wrapper'>

                <div className='wallet-title'>
                <span className='message'>
                    Hi, {context.state.full_name}
                </span>
                </div>

                <div className='address-wrapper'>
                    <p>Your Wallet address &nbsp;&nbsp;&nbsp;<strong>{context.state.address}</strong>
                        {context.state.copiedWalletAddress ?
                            <img src={CopiedIcon} alt='Show/hide' /> :
                            <img src={CopyIcon} alt='Show/hide' onClick={context.copyWalletAddress} />
                        }
                    </p>
                </div>





                <div className='wallet-title'>
                <span className='message'>
                    Your Wallet Balance
                </span>
                    <span className="line"></span>
                </div>

                <div className='tokens-claimed-wrapper'>
                    {/* <p className="one-flex-item">
                    <div><strong>REMEs earned and available now:</strong></div>
                    <ul className='token-details'>
                        <li><span>Available ReMStars</span><span className="tokens-total-amount">{context.state.tokensBalance.formatted}</span></li>
                    </ul>
                </p> */}
                    <p className="one-flex-item">
                        <div><strong>CAPs ready to be claimed from RRP:</strong></div>
                        <ul className='token-details'>
                            <li><span>CAPs from Registration</span>{(+context.state.claimTokens.signup).toFixed(2)}</li>
                            <li><span>CAPs from Registration Referrals</span>{(+context.state.claimTokens.referral).toFixed(2)}</li>
                            <li><span></span><span className="tokens-total-amount">{(+context.state.tokensForClaiming).toFixed(2)}</span></li>
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
                        <div><strong>Caps converted to REMEs ready for use:</strong></div>
                        <ul className='token-details'>
                            <li><span>REMEs available now</span><span className="tokens-total-amount">{context.state.tokensBalance.formatted}</span></li>
                        </ul>
                    </p>
                    {/* <p className="one-flex-item">
                    <div><strong>REMEs ready to be claimeds:</strong></div>
                    <ul className='token-details'>
                        <li><span>Sign Up REMEs</span>{(+context.state.claimTokens.signup).toFixed(2)}</li>
                        <li><span>From referrals</span>{(+context.state.claimTokens.referral).toFixed(2)}</li>
                        <li><span></span><span className="tokens-total-amount">{(+context.state.tokensForClaiming).toFixed(2)}</span></li>
                    </ul>
                </p> */}
                </div>

                <div className='wallet-title'>
                <span className='message'>
                    {`ReMeLife Referral Program${" "}(RRP)`}
                </span>
                    <span className="line referrelLine"></span>
                </div>
                <div className='referral-link-wrapper'>
                <span className='message'>
                    <strong>Visit the</strong>
                </span>
                    <span className='underline' onClick={() => window.open(`${context.state.referralPlatformUserLink}`)}><strong>ReMeLife Referral Program</strong></span>
                </div>
                <dl className='referral-titles'>
                    <dt>Earn bonus REME tokens when you invite friends and family.</dt>
                    <dt>Just copy and share the link below, in an email something like
                        &nbsp;<a href={'https://healthconnected.agilecrm.com/forms/6713543266729984'} target={'_blank'} rel="noreferrer">this</a>.
                    </dt>
                </dl>
                <div className='input-wrapper'>
                    <input type='text' value={context.state.referralCode} />
                    {context.state.copiedCode ?
                        <img src={CopiedIcon} alt='Show/hide' /> :
                        <img src={CopyIcon} alt='Show/hide' onClick={context.copyReferralCode} />
                    }
                </div>

            </section>
        </>
    )
}
