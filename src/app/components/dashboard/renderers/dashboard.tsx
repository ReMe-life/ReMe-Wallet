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
import {TooltipComponent} from "../../tooltip";
import Popup from "reactjs-popup";


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
                                        <li><a href="https://remelife.com/token-wallet-explanation/" target='_blank' rel='noreferrer'>Need help?</a></li>
                                        <li><a href="https://remelife.com/" target='_blank' rel='noreferrer'>ReMeLife</a></li>
                                        <li><a href="https://remelife.com/terms-and-conditions/" target='_blank' rel='noreferrer'>Terms & Conditions</a></li>
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
                                    <div>
                                        <strong>CAPs earned from Registrations:</strong>
                                        <TooltipComponent msg={'You earn 200 CAPs from registering as a Member and receive 100 CAPs for every one that you introduce that joins ReMeLIfe. You also receive 50 CAPs when anyone they invite joins and a further 25 when those in level 3 join up. You can view this 3 level network structure in the Referral Panel Program below.'} />
                                    </div>
                                    <ul className="token-details">
                                        <li><span>CAPs from Registration</span>{(+context.state.claimTokens.signup).toFixed(2)}</li>
                                        <li><span>CAPs from Registration Referrals</span>{(+context.state.claimTokens.referral).toFixed(2)}</li>
                                        <li><span></span><span
                                            className="tokens-total-amount"><strong>{(+context.state.tokensForClaiming).toFixed(2)}</strong></span></li>
                                    </ul>
                                </div>
                                <div className="one-flex-item">
                                    <div><strong>The value of your CAPs:</strong>
                                        <TooltipComponent msg={'Your earned CAPs can be converted to REMEs (that are the actual crypto tokens), once we’ve launched the REME network. This is calculated at a conversion rate that reflects the network size and REME value at the time.\n' +
                                        'This box shows the value of your CAPs if you converted them to REMEs today, based on the planned launch price of REMEs on a token exchange.'} />
                                    </div>
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
                                    <div><strong>Caps converted to REMEs:</strong>
                                        <TooltipComponent msg={'This box shows how many CAPs you have converted to REMEs ready to be used for making purchases in the ReMe Market or sold on token exchanges.'} />
                                    </div>
                                    <ul className="token-details">
                                        <li><span>REMEs available now</span><strong>{context.state.tokensBalance.formatted}</strong></li>
                                    </ul>
                                </div>
                                <div className="one-flex-item purple">
                                    <img className="top-over" src={EthPng} alt={'RemeLife'}/>
                                    <div><strong>Required ETH to convert CAPs:</strong>
                                        <TooltipComponent msg={'This shows the balance of ETH that will be required today to pay the transaction cost if you were to convert your CAPs to REMEs now.'} />
                                    </div>
                                    <ul className="token-details">
                                        <li><span>Number of ETH required at today's rate</span> <strong>{context.state.ethBalance.formatted}</strong></li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="rrp-section login">
                            <h3>ReMeLife Community Builder (RCB) <TooltipComponent msg={'The ReMeLife Community Builder shows you your network of Members and enables you to invite others to join ReMeLife within your network so that you gain rewards from their activities.'} /></h3>
                            <a href={context.state.referralPlatformUserLink} className="btn secondary green" target='_blank'  rel="noreferrer" >Visit the <span className="dt" onClick={() => window.open(`${context.state.referralPlatformUserLink}`)}>RCB</span>
                                <span className="mob">RCB</span>&gt;</a>
                            <p>Earn bonus REME tokens when you invite friends and family.
                                Just copy and share the link below, in an email something like this
                                <Popup trigger={<a  rel='noreferrer' style={{color: 'red', cursor: 'pointer'}}> here </a>} modal closeOnDocumentClick>
                                    {(close: any) => (
                                        <div>
                                            <div style={{paddingLeft: '20px',paddingRight: '20px' , textAlign: 'left'}}>
                                                <h3 style={{textAlign: 'center'}}>Inviting your family,friends & network to join ReMeLife</h3>
                                                <h4 style={{textAlign: 'center'}}>Here's some text that you can copy, paste, edit and send to your friends, in an email or using social media.</h4>
                                                <p>Hi XXX,</p>
                                                <p>I’ve joined as a member of the ReMeLife Community. I think you'll find it to be of interest to you. And I’d like you to join my network.</p>
                                                <p>ReMeLife is an online platform that supports families and those that need to be connected, especially when care is involved. ReMeLife provides free apps and many useful services. But perhaps its most unique feature is that when you use ReMeLife’s apps to support and engage with others in your social, family and care network, you earn crypto tokens.</p>
                                                <p>You earn them as you do those things that you're probably doing already. And you earn them passively in background. They just appear in your wallet. Soon you’ll be able to buy products and trade them for cash.</p>
                                                <p>So, I'd like to invite you to join my network, and to also build your own. There are no costs, no work involved and no catches. ReMeLife just provides great free apps and a means to monetise your daily digital family and care actions, for your own benefit instead of for the tech giants.</p>
                                                <p>It’s simple and free. Just visit www.ReMeLife.com, have a look around and then click any ‘Join as a Member’ button (or click https://remelife.com/remelife-membership/) and follow the instructions.</p>
                                                <p>When you're asked during registration to register for your ReMe Wallet, you'll be asked if you were introduced by anyone (that's me). Please then enter this Referral link URL, so you’ll join only my network: https://wallet.remelife.com/registration/E922J624C????? (enter yours as provided in your wallet).</p>
                                                <p>That’s it. Do get in touch if you want to learn more about it all.</p>
                                                <p>Best wishes, XXX</p>
                                                <p style={{textAlign: 'center'}}>It's as easy as that. You'll soon be earning passive monthly rewards.</p>
                                            </div>
                                            <img src={CopySVG} alt='Show/hide' style={{cursor: 'pointer'}} onClick={()=>navigator.clipboard.writeText('<h3>Inviting your family,friends & network to join ReMeLife</h3>\n' +
                                                '                                                <p>Here\'s some text that you can copy, paste, edit and send to your friends, in an email or using social media.</p>\n' +
                                                '                                                <p>Hi XXX,</p>\n' +
                                                '                                                <p>I’ve joined as a member of the ReMeLife Community. I think you\'ll find it to be of interest to you. And I’d like you to join my network.</p>\n' +
                                                '                                                <p>ReMeLife is an online platform that supports families and those that need to be connected, especially when care is involved. ReMeLife provides free apps and many useful services. But perhaps its most unique feature is that when you use ReMeLife’s apps to support and engage with others in your social, family and care network, you earn crypto tokens.</p>\n' +
                                                '                                                <p>You earn them as you do those things that you\'re probably doing already. And you earn them passively in background. They just appear in your wallet. Soon you’ll be able to buy products and trade them for cash.</p>\n' +
                                                '                                                <p>So, I\'d like to invite you to join my network, and to also build your own. There are no costs, no work involved and no catches. ReMeLife just provides great free apps and a means to monetise your daily digital family and care actions, for your own benefit instead of for the tech giants.</p>\n' +
                                                '                                                <p>It’s simple and free. Just visit www.ReMeLife.com, have a look around and then click any ‘Join as a Member’ button (or click https://remelife.com/remelife-membership/) and follow the instructions.</p>\n' +
                                                '                                                <p>When you\'re asked during registration to register for your ReMe Wallet, you\'ll be asked if you were introduced by anyone (that\'s me). Please then enter this Referral link URL, so you’ll join only my network: https://wallet.remelife.com/registration/E922J624C????? (enter yours as provided in your wallet).</p>\n' +
                                                '                                                <p>That’s it. Do get in touch if you want to learn more about it all.</p>\n' +
                                                '                                                <p>Best wishes, XXX</p>\n' +
                                                '                                                <h6>It\'s as easy as that. You\'ll be earning rewards in no time.</h6>' +
                                                '')} />
                                            <a className="close" onClick={close}>
                                                &times;
                                            </a>
                                        </div>
                                    )}
                                </Popup>.
                            </p>
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
