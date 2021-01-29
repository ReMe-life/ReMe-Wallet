import { Component, ReactNode } from 'react'

import { ForgottenPasswordRender } from './renderers'
import { ErrorPopUp } from '../../errors'
import { UserService } from '../../../services'

type State = {
    email: string
    loading: boolean
    toggleShow: boolean
}

export class ForgottenPassword extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.onEmail = this.onEmail.bind(this)
        this.setToggle = this.setToggle.bind(this)
        this.submitResetRequest = this.submitResetRequest.bind(this)

        this.state = {
            email: '',
            loading: false,
            toggleShow: false,
        }
    }

    public render (): ReactNode {
        return ForgottenPasswordRender(this)
    }

    public onEmail (event: any) {
        this.setState({ email: event.target.value })
    }

    public setToggle () {
        this.setState({ toggleShow: !this.state.toggleShow })
    }

    public async submitResetRequest () {
        try {
            this.setState({ loading: true })

            await UserService.forgotPassword(this.state.email)
            this.props.history.push('/')
        }
        catch (error) {
            this.setState({ loading: false })

            console.log(error)
            ErrorPopUp.show('Resetting password failed')
        }
    }
}
