import React from 'react'
import { Component, ReactNode } from 'react'

import { MnemonicRecoveryRender, PasswordRecoveryRender } from './renderers'
import { ErrorPopUp } from '../../errors'
import { UserService, WalletService } from '../../../services'

type State = {
    password: string
    mnemonic: string
    loading: boolean
    toggleShow: boolean
    recoveryPhrase: string
    selectedRecoverMethod: string
    showMnemonicRecovery: boolean
    showPasswordRecovery: boolean
}

export class WalletRecovery extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.onPassword = this.onPassword.bind(this)
        this.onMnemonic = this.onMnemonic.bind(this)
        this.recover = this.recover.bind(this)
        this.showMnemonicBox = this.showMnemonicBox.bind(this)
        this.showPasswordBox = this.showPasswordBox.bind(this)
        this.initWalletFromPassword = this.initWalletFromPassword.bind(this)
        this.initWalletFromMnemonic = this.initWalletFromMnemonic.bind(this)

        this.state = {
            password: '',
            mnemonic: '',
            loading: false,
            toggleShow: false,
            recoveryPhrase: '',
            selectedRecoverMethod: '',
            showMnemonicRecovery: false,
            showPasswordRecovery: false
        }
    }

    public render (): ReactNode {
        return (
            <section className='wrapper register'>
                <div className='common-wrapper'>
                    <p>Select how to recover you password.</p>
                    <div className="recovery-options">
                        <button className='recovery-option btn primary' onClick={this.showPasswordBox}>Old password</button>
                        <button className='recovery-option btn primary' onClick={this.showMnemonicBox}>Mnemonic</button>
                    </div>
                    {this.state.showMnemonicRecovery ? MnemonicRecoveryRender(this) : null}
                    {this.state.showPasswordRecovery ? PasswordRecoveryRender(this) : null}

                    {
                        this.state.showMnemonicRecovery || this.state.showPasswordRecovery ?
                            <div className='buttons-wrapper'>
                                <button className='btn primary' disabled={this.state.loading} onClick={this.recover}> {this.state.loading ? <div className='loader'></div> : 'Recover'}</button>
                            </div>
                            : null
                    }

                </div>
            </section>
        )
    }

    public showPasswordBox () {
        this.setState({ selectedRecoverMethod: 'Password', showMnemonicRecovery: false, showPasswordRecovery: true })
    }

    public showMnemonicBox () {
        this.setState({ selectedRecoverMethod: 'Mnemonic', showMnemonicRecovery: true, showPasswordRecovery: false })
    }

    public onPassword (event: any) {
        this.setState({ recoveryPhrase: event.target.value })
    }

    public onMnemonic (event: any) {
        this.setState({ recoveryPhrase: event.target.value })
    }

    public async recover () {
        try {
            this.setState({ loading: true })

            const token = localStorage.getItem('token') || ''
            const user = await UserService.getUserDetails(token)

            // @ts-ignore
            const wallet = await this[`initWalletFrom${this.state.selectedRecoverMethod}`](user.wallet.json)
            user.wallet = await wallet.encrypt(this.props.history.location.state.newPassword)

            await UserService.saveNewWallet(token, user.wallet)
            this.props.history.push('/dashboard')
        }
        catch (error) {
            this.setState({ loading: false })

            console.log(error)
            ErrorPopUp.show('Resetting password failed')
        }
    }

    private async initWalletFromPassword (wallet: string) {
        return WalletService.fromEncryptedJson(wallet, this.state.recoveryPhrase)
    }

    private async initWalletFromMnemonic () {
        return WalletService.fromMnemonic(this.state.recoveryPhrase)
    }
}
