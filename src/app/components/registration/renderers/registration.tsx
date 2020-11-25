import React from 'react'
import PasswordToggle from '../../../assets/svg/show-password.svg'

export const RegistrationRender = function (context: any) {
    return (
        <section className='wrapper login'>
            <h2>Your account</h2>
            <div className='common-wrapper'>
                <form className='form-inline center'>
                    <input size={30} placeholder='First Name' type='text' className='form-control input' onChange={context.onFirstName} />
                    <input size={30} placeholder='Last Name' type='text' className='form-control input' onChange={context.onLastName} />
                    <input size={30} placeholder='Email' type='text' className='form-control input' onChange={context.onEmail} />
                    <div className='password-wrapper'>
                        <input size={30} placeholder='Password' type='password' className='form-control input' onChange={context.onPassword} />
                        <img src={PasswordToggle} alt='Show/hide password' />
                    </div>
                    <button type='button' className='btn primary' disabled={context.state.loading} onClick={context.register}> {context.state.loading ? <div className='loader'></div> : 'Sign in'}</button>
                </form>
            </div>
        </section>
    )
}
