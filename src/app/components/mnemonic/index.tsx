import { saveAs } from 'file-saver';
import copy from 'copy-to-clipboard';
import React, { Component, ReactNode } from 'react'

import { MnemonicRender } from './renderers'

import { ErrorPopUp } from '../../errors'
import { withoutAuth } from '../HOCs'

type State = {
    render: string
    copiedMnemonic: boolean
    originalMnemonic: string
    confirmedMnemonic: string
}

class Mnemonic extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.copyMnemonic = this.copyMnemonic.bind(this)
        this.downloadMnemonic = this.downloadMnemonic.bind(this)
        this.confirmMnemonic = this.confirmMnemonic.bind(this)
        this.viewMnemonic = this.viewMnemonic.bind(this)
        this.onMnemonicInput = this.onMnemonicInput.bind(this)
        this.confirmSavedMnemonic = this.confirmSavedMnemonic.bind(this)

        this.state = {
            render: 'mnemonic',
            copiedMnemonic: false,
            // @ts-ignore
            originalMnemonic: JSON.parse(localStorage.getItem('user')).wallet.mnemonic.phrase,
            confirmedMnemonic: ''
        }
    }

    public render (): ReactNode {
        return (
            <section className='wrapper mnemonic'>
                <h2>Your account</h2>
                <div className='common-wrapper'>
                    {MnemonicRender(this)}
                </div>
            </section>
        )
    }

    public copyMnemonic () {
        copy(this.state.originalMnemonic)
        this.setState({ copiedMnemonic: true })
    }

    public downloadMnemonic () {
        var data = new Blob([this.state.originalMnemonic], { type: 'text/plain;charset=utf-8' });
        saveAs(data, 'mnemonic.txt');
    }

    public confirmMnemonic () {
        this.setState({ render: 'confirm' })
    }

    public viewMnemonic () {
        this.setState({ render: 'mnemonic', copiedMnemonic: false })
    }

    public onMnemonicInput (event: any) {
        this.setState({ confirmedMnemonic: event.target.value })
    }

    public confirmSavedMnemonic () {
        if (this.state.confirmedMnemonic !== this.state.originalMnemonic) {
            return ErrorPopUp.show('Entered mnemonic mismatch the original one')
        }

        this.props.history.push('/dashboard')
    }

}

export default withoutAuth('/', Mnemonic, '/mnemonic')
