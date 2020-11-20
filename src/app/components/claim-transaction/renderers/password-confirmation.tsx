import React from 'react'

export const PasswordConfirmationRender = function (context: any) {
    return (
        <div className='claim-wrapper'>
            <p className='message'>To claim the <strong>ReMC 34</strong>, we need you to enter your password. </p>
            <input size={30} placeholder='Password' type='password' className='form-control input' />
            <p className='fee'>Transaction Fee&nbsp;&nbsp;<strong>ETH 0</strong></p>
            <div className='buttons-wrapper'>
                <button className='btn primary'>Confirm</button>
            </div>
        </div>
    )
}