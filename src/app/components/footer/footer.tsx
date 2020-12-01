import React from 'react'
import RemeLogo from '../../assets/svg/reme-logo-light.svg'
import TermsIcon from '../../assets/svg/terms.svg'

export const Footer = function (context: any) {
    return (
        <footer>
            <img src={RemeLogo} alt='ReMeLife' />
            <h3><i>ReMe</i>&nbsp;Life</h3>
            <div className='btn'>Do you need help?</div>
            <a className='terms' href='/dashboard'>
                <img src={TermsIcon} />
                Terms and Conditions
            </a>
        </footer>
    )
}
