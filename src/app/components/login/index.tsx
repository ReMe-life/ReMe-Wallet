import { Component, ReactNode } from 'react'

import { LoginRender } from './renderers'
import { ErrorPopUp } from '../../errors'
import { UserService } from '../../../services'

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

    public async login () {
        try {
            this.setState({ loading: true })

            const tokenData = await UserService.login(this.state.email, this.state.password)
            if (tokenData.token) {
                localStorage.setItem('token', tokenData.token)
                localStorage.setItem('encToken', tokenData.encToken)
                return this.props.history.push('/dashboard')
            }

            const result = await UserService.register(this.state.email, this.state.password)
            localStorage.setItem('token', result.tokenData.token)
            localStorage.setItem('encToken', result.tokenData.encToken)
            this.props.history.push({
                pathname: '/mnemonic',
                state: { mnemonic: result.mnemonic }
            })
        }
        catch (error) {
            this.setState({ loading: false })

            console.log(error)
            ErrorPopUp.show('Invalid email or password')
        }
    }

}

export default withAuth('/dashboard', Login, '/')
