import React from 'react'
import PasswordToggle from '../../../assets/svg/show-password.svg'

export const RegistrationRender = function (context: any) {
    return (
        <section className='wrapper register login'>
            <h2>Setup your ReMeLife membership</h2>
            <div className='common-wrapper'>
                <p>Already a ReMeLife member? <a href="/">Login</a></p>
                <form className='form-inline center'>
                    <input size={30} placeholder='First Name' type='text' className='form-control input' onChange={context.onFirstName} />
                    <input size={30} placeholder='Last Name' type='text' className='form-control input' onChange={context.onLastName} />
                    <input size={30} placeholder='Email' type='text' className='form-control input' onChange={context.onEmail} />
                    <div className='password-wrapper'>
                        <input size={30} placeholder='Password' type={context.state.toggleShow ? 'text' : 'password'} value={context.state.password} className='form-control input' onChange={context.onPassword} />
                        <img src={PasswordToggle} alt='Show/hide password' onClick={context.setToggle} />
                    </div>
                    <div className='password-wrapper'>
                        <input size={30} placeholder='Re enter password' type={context.state.reToggleShow ? 'text' : 'password'} value={context.state.repassword} className='form-control input' onChange={context.onRePassword} />
                        <img src={PasswordToggle} alt='Show/hide re password' onClick={context.setReToggle} />
                    </div>
                    <p>By registering you agree with the <div className='terms-and-conditions' onClick={() => { window.open('https://remelife.com/terms-and-conditions/') }}>Terms of Service/Conditions</div></p>
                    <button type='button' className='btn primary' disabled={context.state.loading} onClick={context.register}> {context.state.loading ? <div className='loader'></div> : 'Register'}</button>
                </form>
            </div>
        </section>
    )
}
