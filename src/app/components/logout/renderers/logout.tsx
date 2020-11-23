import React from 'react'

export const LogoutRender = function (context: any) {
    return (
        <section className='profile-wrapper'>
            <p>Welcome to your home page, {context.props.email}</p>
            <button type='button' className='btn subtle' onClick={context.logout}>Log out</button>
        </section>
    )
}
