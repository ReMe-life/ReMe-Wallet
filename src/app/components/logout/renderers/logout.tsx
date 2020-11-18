import React from 'react'

export const LogoutRender = function (context: any) {
    return (
        <section className='wrapper login'>
            <div className='common-wrapper'>
                <form className='form-inline center'>
                    <button type='button' className='btn primary' onClick={context.logout}>Logout</button>
                </form>
            </div>
        </section>
    )
}
