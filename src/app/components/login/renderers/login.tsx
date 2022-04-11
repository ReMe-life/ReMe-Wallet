import React from 'react'
import PasswordToggle from '../../../assets/svg/show-password.svg'
import ApplicationBackground from '../../../assets/images/background.6e81d4b2.jpg'
import Logo from '../../../assets/images/reme-logo.svg'

export const LoginRender = function (context: any) {
    return (
        <div className="application" style={{backgroundImage: `url(${ApplicationBackground})`}}>
            <div className="title"><h1><img src={Logo} alt="ReMe Wallet"/></h1></div>
            <section className="wrapper login">
                <div className="common-wrapper">
                    <form className="form-inline center">
                        <input size={30} placeholder='email' type='text' className='form-control input' onChange={context.onEmail} />
                        <div className="password-wrapper">
                            <input size={30} placeholder='Password' type={context.state.toggleShow ? 'text' : 'password'} value={context.state.password} className='form-control input' onChange={context.onPassword} />
                            <img src={PasswordToggle} alt='Show/hide password' onClick={context.setToggle} />
                        </div>
                        <div className="login-actions">
                            <button type='button' className='btn primary login-action' disabled={context.state.loading} onClick={context.login}> {context.state.loading ? <div className='loader'></div> : 'Login'}</button>
                            <a className="login-action" href="/forgotten-password">Forgot Password?</a></div>
                        <a href={'#'} target='_blank' className="btn secondary green" onClick={() => { window.open('https://remelife.com/token-wallet-explanation/') }} rel='noreferrer'>
                            Do you need help?
                        </a>
                    </form>
                </div>
                <div className="terms-links">
                    <a href="https://remelife.com/" target="_blank"
                                                rel="noreferrer">ReMeLife</a> | <a href={"https://remelife.com/terms-and-conditions/"}
                    onClick={() => { window.open('https://remelife.com/terms-and-conditions/') }} target="_blank" rel="noreferrer">Terms &
                    Conditions</a></div>
            </section>
        </div>
    )
}
