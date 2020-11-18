import React, { Component, ReactNode } from 'react'

import { AuthRender } from './renderers'
import { UserService } from '../../../services'

type State = {
    email: string
    password: string
}

export class Auth extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.auth = this.auth.bind(this)
        this.onEmail = this.onEmail.bind(this)
        this.onPassword = this.onPassword.bind(this)


        this.state = {
            email: '',
            password: ''
        }
    }

    public render (): ReactNode {
        return (
            <div className='application'>
                { AuthRender(this)}
            </div>
        )
    }

    public onEmail (event: any) {
        this.setState({ email: event.target.value })
    }

    public onPassword (event: any) {
        this.setState({ password: event.target.value })
    }

    public async auth () {
        try {
            const email = this.state.email
            const password = this.state.password

            let user = await UserService.login(email, password)
            if (!user) {
                user = await UserService.register(email, password)
                alert(user.wallet.mnemonic.phrase)
                // Todo: Show mnemonic
            }

            localStorage.setItem('userData', JSON.stringify(user.data))
            localStorage.setItem('userWallet', JSON.stringify(user.wallet))

            this.props.history.push('/dashboard')
        }
        catch (error) {
            // Todo: show error
            console.log(error)
        }
    }

}
