import React, { Component, ReactNode } from 'react'

import { DashboardRender } from './renderers'

import { Logout } from '../logout'
import { withAuth } from '../HOCs'

import { BalanceService } from '../../../services'

type State = {
    ethAmount: string;
    tokensAmount: string;
}

class Dashboard extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.state = {
            ethAmount: '0',
            tokensAmount: '0'
        }
    }

    async componentDidMount () {
        if (localStorage.getItem('userWallet')) {
            // @ts-ignore
            const userWallet = JSON.parse(localStorage.getItem('userWallet'))            
            const ethAmount = await BalanceService.ethAmount(userWallet.address)
            const tokensAmount = await BalanceService.tokensAmount(userWallet.address)

            this.setState({ ethAmount, tokensAmount })
        }
    }

    render (): ReactNode {
        return (
            <div>
                <Logout history={this.props.history} />
                <h1>Dashboard</h1>
                {DashboardRender(this)}
            </div >
        )
    }
}

export default withAuth(Dashboard, '/dashboard')