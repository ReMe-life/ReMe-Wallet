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
    copiedOrDownloaded: boolean
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
            originalMnemonic: this.props.history.location.state.mnemonic.phrase,
            confirmedMnemonic: '',
            copiedOrDownloaded: false
        }

        localStorage.removeItem('allowed')
    }

    public render (): ReactNode {
        return (
            <section className='wrapper mnemonic'>
                <h2>Setting up your wallet</h2>
                <div className='common-wrapper'>
                    {MnemonicRender(this)}
                </div>
            </section>
        )
    }

    public copyMnemonic () {
        copy(this.state.originalMnemonic)
        this.setState({ copiedMnemonic: true, copiedOrDownloaded: true })
    }

    public downloadMnemonic () {
        const data = new Blob([this.state.originalMnemonic], { type: 'text/plain;charset=utf-8' });
        saveAs(data, 'mnemonic.txt');
        this.setState({ copiedOrDownloaded: true })
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

        localStorage.setItem('allowed', 'true')
        this.props.history.push('/dashboard')
    }

}

export default withoutAuth('/', Mnemonic, '/mnemonic')
