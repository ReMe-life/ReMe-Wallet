import { Component, ReactNode } from 'react'

import { LoginRender } from './renderers'
import { ErrorPopUp } from '../../errors'
import { UserService, WalletService } from '../../../services'

import { withAuth } from '../HOCs'

type State = {
    email: string
    password: string
    loading: boolean
    toggleShow: boolean
}

class Login extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.login = this.login.bind(this)
        this.onEmail = this.onEmail.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.forgotPassword = this.forgotPassword.bind(this)
        this.setToggle = this.setToggle.bind(this)

        this.state = {
            email: '',
            password: '',
            loading: false,
            toggleShow: false,
        }
    }

    public render (): ReactNode {
        return LoginRender(this)
    }

    public onEmail (event: any) {
        this.setState({ email: event.target.value })
    }

    public onPassword (event: any) {
        this.setState({ password: event.target.value })
    }

    public setToggle () {
        this.setState({ toggleShow: !this.state.toggleShow })
    }

    public async forgotPassword () {
        this.setState({ loading: false })
        this.props.history.push('/forgotten-password')
    }

    public async login () {
        try {
            this.setState({ loading: true })

            const loginData = await UserService.login(this.state.email, this.state.password)
            if (loginData.token) {
                localStorage.setItem('token', loginData.token)
                localStorage.setItem('encToken', loginData.encToken)

                const user = await UserService.getUserDetails(loginData.token)
                if (await this.needToRecoverWallet(user.wallet.json)) {
                    return this.props.history.push({
                        pathname: '/wallet-recovery',
                        state: { newPassword: this.state.password }
                    })
                }

                localStorage.setItem('allowed', 'true')
                return this.props.history.push('/dashboard')
            }

            await this.registerOnFirstLogin()
        }
        catch (error) {
            this.setState({ loading: false })

            console.log(error)
            ErrorPopUp.show('Invalid email or password. Ensure that you do not have a blank space at the end of the email address or a capital within it.')
        }
    }

    private async needToRecoverWallet (wallet: string): Promise<boolean> {
        try {
            await WalletService.fromEncryptedJson(wallet, this.state.password)
            return false
        } catch (error) {
            return true
        }
    }

    private async registerOnFirstLogin () {
        const result = await UserService.register(this.state.email, this.state.password)
        localStorage.setItem('token', result.tokenData.token)
        localStorage.setItem('encToken', result.tokenData.encToken)
        localStorage.setItem('allowed', 'true')

        this.props.history.push({
            pathname: '/mnemonic',
            state: { mnemonic: result.mnemonic }
        })
    }

}

export default withAuth('/dashboard', Login, '/')
