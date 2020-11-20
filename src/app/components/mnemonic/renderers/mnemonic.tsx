import React from 'react'

export const MnemonicRender = function (context: any) {
    if (context.state.render === 'mnemonic') {
        return mnemonic(context)
    }

    return mnemonicConfirm(context)
}

const mnemonic = function (context: any) {
    return (
        <div className='mnemonic-wrapper'>
            <p>This is your <strong>mnemonic code</strong> that is used to secure your account. </p>
            <p>Please, either <strong>write it down on paper</strong>, <strong>copy it</strong> or <strong>download it</strong> as a text document and keep it secure to ensure your account is safe. </p>

            <div className='mnemonic'>
                <div className='wrapper'>
                    {context.state.originalMnemonic.split(' ').map((item: any, index: any) => {
                        return <span key={index}>{item}</span>
                    })}
                </div>
                <button className='btn primary-subtle' onClick={context.copyMnemonic}>{context.state.copiedMnemonic ? 'Copied!' : 'Copy'}</button>
                <button className='btn primary-subtle' onClick={context.downloadMnemonic}>Download as text</button>
            </div>
            <p>Note that <strong>you will only see this code once</strong>. After you saved it, click the button below to continue.</p>
            <button className='btn primary' onClick={context.confirmMnemonic}>I have saved the code</button>
        </div>
    )
}

const mnemonicConfirm = function (context: any) {
    return (
        <div className='mnemonic-wrapper'>
            <p>Having saved your mnemonic code, please enter it here for confirmation. </p>
            <input size={30} placeholder='mnemonic code' type='text' className='form-control input' onChange={context.onMnemonicInput} />
            <div className='buttons-wrapper'>
                <button className='btn secondary' onClick={context.viewMnemonic}>Go back</button>
                <button className='btn primary' onClick={context.confirmSavedMnemonic}>Continue</button>
            </div>
        </div>
    )
}
