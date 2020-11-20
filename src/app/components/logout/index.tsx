import { Component, ReactNode } from 'react'

import { UserService } from '../../../services'
import { LogoutRender } from './renderers'

export class Logout extends Component<{ history: any, email: string }, {}> {

    public constructor (props: any) {
        super(props)

        this.logout = this.logout.bind(this)
    }

    public render (): ReactNode {
        return (
            LogoutRender(this)
        )
    }

    public async logout () {
        await UserService.logout();

        localStorage.removeItem('userData');
        localStorage.removeItem('userWallet');

        this.props.history.push('/');
    }

}