import { Component, ReactNode } from 'react'

import { LogoutRender } from './renderers'
import { clearLocalStorage } from '../helpers'

export class LogoutMobile extends Component<{ history: any, email: string }, {}> {

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
        clearLocalStorage(this.props.history)
    }

}