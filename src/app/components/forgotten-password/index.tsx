import { Component, ReactNode } from 'react'

import { ForgottenPasswordRender } from './renderers'
import { ErrorPopUp } from '../../errors'
import { UserService } from '../../../services'

type State = {
    email: string
    loading: boolean
}

export class ForgottenPassword extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.onEmail = this.onEmail.bind(this)
        this.submitResetRequest = this.submitResetRequest.bind(this)

        this.state = {
            email: '',
            loading: false
        }
    }

    public render (): ReactNode {
        return ForgottenPasswordRender(this)
    }

    public onEmail (event: any) {
        this.setState({ email: event.target.value })
    }

    public async submitResetRequest () {
        try {
            this.setState({ loading: true })

            await UserService.forgotPassword(this.state.email)
            // That is an info
            ErrorPopUp.show('We have sent you an email, check your inbox')
            this.props.history.push('/')
        }
        catch (error) {
            this.setState({ loading: false })

            console.log(error)
            ErrorPopUp.show('Resetting password failed')
        }
    }
}
