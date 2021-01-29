import React from 'react'

export const ForgottenPasswordRender = function (context: any) {
    return (
        <section className='wrapper balance-wrapper'>
            <h2>Forgot Password</h2>
            <div className='common-wrapper'>
                <div className='balance'>
                    <p>Please enter your email address below and we will send you information to change your password.</p>
                    <input size={30} placeholder='Email' type='text' className='form-control input' onChange={context.onEmail} />
                    <div className='buttons-wrapper'>
                        <button className='btn primary' disabled={context.state.loading} onClick={context.submitResetRequest}> {context.state.loading ? <div className='loader'></div> : 'Request resetting'}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
