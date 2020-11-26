import React, { Component, ReactNode } from 'react'

import { RegistrationRender } from './renderers'
import { ErrorPopUp } from '../../errors'
import { UserService } from '../../../services'

import { withAuth } from '../HOCs'

type State = {
    email: string
    password: string
    firstName: string
    lastName: string
    loading: boolean
}

class Registration extends Component<{ history: any, match: any }, State> {

    public constructor (props: any) {
        super(props)

        this.register = this.register.bind(this)
        this.onEmail = this.onEmail.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.onFirstName = this.onFirstName.bind(this)
        this.onLastName = this.onLastName.bind(this)

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            loading: false
        }
    }

    public render (): ReactNode {
        return (
            <div className='application'>
                { RegistrationRender(this)}
            </div>
        )
    }

    public onEmail (event: any) {
        this.setState({ email: event.target.value })
    }

    public onPassword (event: any) {
        this.setState({ password: event.target.value })
    }

    public onFirstName (event: any) {
        this.setState({ firstName: event.target.value })
    }

    public onLastName (event: any) {
        this.setState({ lastName: event.target.value })
    }

    public async register () {
        try {
            this.setState({ loading: true })

            const user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }

            const result = await UserService.registerByReferral(user, this.props.match.params.referredBy)
            localStorage.setItem('token', result.token)
            this.props.history.push({
                pathname: '/mnemonic',
                state: { mnemonic: result.mnemonic }
            })
        }
        catch (error) {
            this.setState({ loading: false })

            console.log(error)
            ErrorPopUp.show('Registration failed')
        }
    }

}

export default Registration
