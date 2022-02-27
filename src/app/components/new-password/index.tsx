import { Component, ReactNode } from 'react'

import { NewPasswordRender } from './renderers'
import { ErrorPopUp } from '../../errors'
import { UserService } from '../../../services'

type State = {
    loading: boolean
    toggleShow: boolean
    reToggleShow: boolean
    password: string
    repassword: string
}

export class NewPassword extends Component<{ history: any, match: any }, State> {

    public constructor (props: any) {
        super(props)

        this.setToggle = this.setToggle.bind(this)
        this.setReToggle = this.setReToggle.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.onRePassword = this.onRePassword.bind(this)
        this.saveNewPassword = this.saveNewPassword.bind(this)

        this.state = {
            loading: false,
            toggleShow: false,
            reToggleShow: false,
            password: '',
            repassword: '',
        }
    }

    public render (): ReactNode {
        return NewPasswordRender(this)
    }

    public onPassword (event: any) {
        this.setState({ password: event.target.value })
    }

    public onRePassword (event: any) {
        this.setState({ repassword: event.target.value })
    }

    public setToggle () {
        this.setState({ toggleShow: !this.state.toggleShow })
    }

    public setReToggle () {
        this.setState({ reToggleShow: !this.state.reToggleShow })
    }

    public async saveNewPassword () {
        if (this.state.password.length < (process.env.REACT_APP_PASSWORD_MIN_CHARACTERS || 1)) {
            ErrorPopUp.show(`Password minimum: At least ${process.env.REACT_APP_PASSWORD_MIN_CHARACTERS || 1} characters`)
            return void 0
        }

        if (this.state.password !== this.state.repassword) {
            ErrorPopUp.show('Passwords don\'t match')
            return void 0
        }

        try {
            this.setState({ loading: true })

            await UserService.confirmReset(
                this.props.match.params.id,
                this.props.match.params.time,
                this.props.match.params.token,
                this.state.password
            )
            this.props.history.push('/')
        }
        catch (error) {
            this.setState({ loading: false })

            console.log(error)
            ErrorPopUp.show('Setting the new password failed')
        }
    }
}
