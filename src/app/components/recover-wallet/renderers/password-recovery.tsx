import React from 'react'

export const PasswordRecoveryRender = function (context: any) {
    return (
        <div className='balance'>
            <p className='recovery-method-title'>Please enter your old password to recover your wallet.</p>
            <input size={30} placeholder='Old Password' type='text' className='form-control input' onChange={context.onPassword} />
        </div>
    )
}
