import React from 'react'

const mnemonic = ['witch', 'collapse', 'ranger', 'buff', 'cradle', 'tomorrow', 'dog', 'snow', 'beach', 'roach', 'foot', 'skillet']

export const MnemonicRender = function (context: any) {
    return (
        <div className='mnemonic-wrapper'>
            <p>This is your <strong>mnemonic code</strong> that is used to secure your account. </p>
            <p>Please, either <strong>write it down on paper</strong>, <strong>copy it</strong> or <strong>download it</strong> as a text document and keep it secure to ensure your account is safe. </p>

                {console.log(context)}
            <div className='mnemonic'>
                <div className='wrapper'>
                    {mnemonic.map((item, index) => {
                        return <span key={index}>{item}</span>
                    })}
                </div>
                <button className='btn primary-subtle'>Copy</button>
                <button className='btn primary-subtle'>Download as text</button>
            </div>
            <p>Note that <strong>you will only see this code once</strong>. After you saved it, click the button below to continue.</p>
            <button className='btn primary'>I have saved the code</button>
        </div>
    )
}
