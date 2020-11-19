import React from 'react'

export const MnemonicConfirmRender = function (context: any) {
    return (
        <div className='mnemonic-wrapper'>
            <p>Having saved your mnemonic code, please enter it here for confirmation. </p>
            <input size={30} placeholder='mnemonic code' type='text' className='form-control input' />
            <div className='buttons-wrapper'>
                <button className='btn secondary'>Go back</button>
                <button className='btn primary'>Continue</button>
            </div>
        </div>
    )
}