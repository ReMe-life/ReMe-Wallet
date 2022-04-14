import React from 'react'
import CopiedIcon from '../../../assets/svg/copied.svg'
import ApplicationBackground from '../../../assets/images/background.6e81d4b2.jpg'
import NavIcon from '../../../assets/images/nav-icon.png'
import NavIconCross from '../../../assets/images/nav-icon-cross.png'
import Logo from '../../../assets/images/reme-logo.svg'
import CopySVG from '../../../assets/images/copy.svg'
import TopOver from '../../../assets/images/reme-icon.fw.png'
import EthPng from '../../../assets/images/eth-icon.fw.png'
import {Logout} from "../../logout";
import {LogoutMobile} from "../../logout-mobile";

export const DashboardRender = function (context: any) {
    return (
        <>
            <div className="application" style={{backgroundImage: `url(${ApplicationBackground})`}}>
                <section className="wrapper homepage">
                    <div className="common-wrapper">
                        <div className="top-header">
                            <div className="title"><h1><img src={Logo} alt={'RemeLife'}/></h1></div>
                            <div className="nav-icon-box">
                                <a href={'https://remelife.com/token-wallet-explanation/'} target='_blank' rel='noreferrer' className="btn secondary green" onClick={() => { window.open('https://remelife.com/token-wallet-explanation/') }}>Need help?</a>
                                <Logout history={context.props.history} email={context.state.email} />
                                <img className="nav-icon" id="nav-icon-click"
                                     src={NavIcon} alt={'RemeLife'}/>
                                <img className="nav-icon-cross" src={NavIconCross} alt={"Reme"}/>
                                <div className="top-menu" id="main-menu">
                                    <ul>
                                        <li><a href="https://remelife.com/token-wallet-explanation/">Need help?</a></li>
                                        <li><a href="https://remelife.com/">ReMeLife</a></li>
                                        <li><a href="https://remelife.com/terms-and-conditions/">Terms & Conditions</a></li>
                                        <LogoutMobile history={context.props.history} email={context.state.email} />
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="wallet-title"><span className="message">Hi, {context.state.full_name}</span></div>
                        <div className="address-wrapper">Your Wallet
                            address: <span>&nbsp;&nbsp;&nbsp;<strong>{context.state.address}</strong></span>
                            {context.state.copiedWalletAddress ?
                                <img src={CopiedIcon} alt='Show/hide' /> :
                                <img src={CopySVG} alt='Show/hide' onClick={context.copyWalletAddress} />
                            }
                        </div>

                        <div className="wallet-balance">
                            <h3>Your Wallet Balance</h3>

                            <div className="tokens-claimed-wrapper">
                                <div className="one-flex-item">
                                    <div><strong>CAPs earned from Registrations:</strong></div>
                                    <ul className="token-details">
                                        <li><span>CAPs from Registration</span>{(+context.state.claimTokens.signup).toFixed(2)}</li>
                                        <li><span>CAPs from Registration Referrals</span>{(+context.state.claimTokens.referral).toFixed(2)}</li>
                                        <li><span></span><span
                                            className="tokens-total-amount"><strong>{(+context.state.tokensForClaiming).toFixed(2)}</strong></span></li>
                                    </ul>
                                </div>
                                <div className="one-flex-item">
                                    <div><strong>The value of your CAPs:</strong></div>

                                    <ul className="token-details">
                                        <li><span>Today’s CAPs to REMEs Conversion rate</span>6.028</li>
                                        <li><span>Total REMEs earned</span>{+(context.state.tokensForClaiming/6.028).toFixed(2)}</li>
                                        <li><span>REMEs exchange launch price</span> £0.10</li>
                                        <li><span>Total value of your REMEs today</span><strong>£&nbsp;{+((context.state.tokensForClaiming/6.028)*0.10).toFixed(2)}</strong></li>
                                    </ul>
                                </div>
                            </div>


                            <div className="tokens-claimed-wrapper wrapper-with-icons">
                                <div className="one-flex-item gray">
                                    <img className="top-over" src={TopOver} alt={'RemeLife'}/>
                                    <div><strong>Caps converted to REMEs:</strong></div>
                                    <ul className="token-details">
                                        <li><span>REMEs available now</span><strong>{context.state.tokensBalance.formatted}</strong></li>
                                    </ul>
                                </div>
                                <div className="one-flex-item purple">
                                    <img className="top-over" src={EthPng} alt={'RemeLife'}/>
                                    <div><strong>Required ETH to convert CAPs:</strong></div>
                                    <ul className="token-details">
                                        <li><span>Number of ETH required at today's rate</span> <strong>{context.state.ethBalance.formatted}</strong></li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="rrp-section login">
                            <h3>ReMeLife Referral Program (RRP)</h3>
                            <a href={context.state.referralPlatformUserLink} className="btn secondary green" target='_blank'  rel="noreferrer" >Visit the <span className="dt" onClick={() => window.open(`${context.state.referralPlatformUserLink}`)}>RRP</span>
                                <span className="mob">RRP</span>&gt;</a>
                            <p>Earn bonus REME tokens when you invite friends and family.
                                Just copy and share the link below, in an email something <a href={'https://healthconnected.agilecrm.com/forms/6713543266729984'} target={'_blank'} rel="noreferrer">like this.</a></p>
                            <div className="password-wrapper"><input size={30}
                                                                     value={context.state.referralCode}
                                                                     type="text" className="form-control input" />
                                {context.state.copiedCode ?
                                    <img src={CopiedIcon} alt='Show/hide' /> :
                                    <img src={CopySVG} alt='Show/hide' onClick={context.copyReferralCode} />
                                }
                            </div>
                        </div>

                    </div>
                    <div className="terms-links">
                        <a href="https://remelife.com/" target="_blank"
                           rel="noreferrer">ReMeLife</a> | <a href={"https://remelife.com/terms-and-conditions/"}
                        onClick={() => { window.open('https://remelife.com/terms-and-conditions/') }} target="_blank" rel="noreferrer">Terms &
                        Conditions</a></div>

                </section>
            </div>
        </>
    )
}
