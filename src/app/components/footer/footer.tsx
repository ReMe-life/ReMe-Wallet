import React from 'react'
import RemeLogo from '../../assets/svg/reme-logo-light.svg'
import TermsIcon from '../../assets/svg/terms.svg'

export const Footer = function (context: any) {
    return (
        <footer>
            <img src={RemeLogo} alt='ReMeLife' />
            <h3><i>ReMe</i>&nbsp;Life</h3>
            <div className='btn' onClick={() => { window.open('https://remelife.com/help/wallet') }}>Do you need help?</div>
            <div className='terms' onClick={() => { window.open('https://remelife.com/terms-and-conditions/') }}>
                <img alt='Term image' src={TermsIcon} />
            Terms and Conditions
        </div>
        </footer>
    )
}
