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

export const DashboardRender = function (context: any) {
    return (
        <>
            <div className="application" style={{backgroundImage: `url(${ApplicationBackground})`}}>
                <section className="wrapper homepage">
                    <div className="common-wrapper">
                        <div className="top-header">
                            <div className="title"><h1><img src={Logo} alt="ReMe Wallet" /></h1></div>
                            <div className="nav-icon-box">
                                <a href="#" className="btn secondary green">Need help?</a>
                                <Logout history={context.props.history} email={context.state.email} />
                                <img className="nav-icon"
                                     src={NavIcon}/>
                                <img className="nav-icon-cross" src={NavIconCross}/>
                                <div className="top-menu">
                                    <ul>
                                        <li><a href="#">Need help?</a></li>
                                        <li><a href="#">ReMeLife</a></li>
                                        <li><a href="#">Terms & Conditions</a></li>
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
                                    <div><strong>CAPs ready to be claimed from RRP:</strong></div>
                                    <ul className="token-details">
                                        <li><span>CAPs from Registration</span>{(+context.state.claimTokens.signup).toFixed(2)}</li>
                                        <li><span>CAPs from Registration Referrals</span>{(+context.state.claimTokens.referral).toFixed(2)}</li>
                                        <li><span></span><span
                                            className="tokens-total-amount"><strong>{(+context.state.tokensForClaiming).toFixed(2)}</strong></span></li>
                                    </ul>
                                </div>
                                <div className="one-flex-item">
                                    <ul className="token-details">
                                        <li><span>Today’s CAPSs to REMEs Conversion rate</span> 0.00</li>
                                        <li><span>Total REMEs earned</span> 0.00</li>
                                        <li><span>REMEs exchange launch price</span> 0.00</li>
                                        <li><span>Total value of your REMEs today</span> 0.00</li>
                                    </ul>
                                </div>
                            </div>


                            <div className="tokens-claimed-wrapper wrapper-with-icons">
                                <div className="one-flex-item gray">
                                    <img className="top-over" src={TopOver}/>
                                    <div><strong>Caps converted to REMEs ready for use:</strong></div>
                                    <ul className="token-details">
                                        <li><span>REMEs available now</span><strong>{context.state.tokensBalance.formatted}</strong></li>
                                    </ul>
                                </div>
                                <div className="one-flex-item purple">
                                    <img className="top-over" src={EthPng}/>
                                    <div><strong>Your ETH balance:</strong></div>
                                    <ul className="token-details">
                                        <li><span>Available ETH</span> <strong>{context.state.ethBalance.formatted}</strong></li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="rrp-section login">
                            <h3>ReMeLife Referral Program (RRP)</h3>
                            <a href="#" className="btn secondary green">Visit the <span className="dt" onClick={() => window.open(`${context.state.referralPlatformUserLink}`)}>ReMeLife Referral Program</span>
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
                    <div className="terms-links"><a href="https://remelife.com/" target="_blank">ReMeLife</a> | <a
                        href="https://remelife.com/terms-and-conditions/" target="_blank">Terms & Conditions</a></div>

                </section>
            </div>
        </>
    )
}
