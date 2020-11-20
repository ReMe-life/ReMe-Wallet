import React, { Component, ReactNode } from 'react'

import { MnemonicRender, MnemonicConfirmRender } from './renderers'

import { withoutAuth } from '../HOCs'

type State = {}

class Mnemonic extends Component<{ history: any }, State> {

    render(): ReactNode {
        return (
            <section className='wrapper mnemonic'>
                <h2>Your account</h2>
                <div className='common-wrapper'>
                    {MnemonicRender(this)}
                    {/* {MnemonicConfirmRender(this)} */}
                </div>
            </section>
        )
    }
}

export default withoutAuth('/', Mnemonic, '/mnemonic')
