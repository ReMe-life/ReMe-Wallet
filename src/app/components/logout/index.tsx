import React, { Component, ReactNode } from 'react'

import { UserService } from '../../../services'
import { LogoutRender } from './renderers'

// React Context consumer
export class Logout extends Component<{ history: any }, {}> {

    public constructor (props: any) {
        super(props)

        this.logout = this.logout.bind(this)
    }

    public render (): ReactNode {
        return (
            <div className='application'>
                {LogoutRender(this)}
            </div>
        )
    }

    public async logout () {
        try {
            await UserService.logout();

            localStorage.removeItem('userData');
            localStorage.removeItem('userWallet');

            this.props.history.push('/');
        }
        catch (error) {
            // Todo: show error
            console.log(error);
        }
    }

}