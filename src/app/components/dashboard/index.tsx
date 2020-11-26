import React, { Component, ReactNode } from 'react'

import { DashboardRender } from './renderers'

import { Logout } from '../logout'
import { withoutAuth } from '../HOCs'

import { ReMePalClient } from '../../../clients'
import { BalanceService } from '../../../services'

type State = {
    ethAmount: string
    tokensAmount: string
    referralLink: string
    earnedTokens: any
}

class Dashboard extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.state = {
            ethAmount: '0',
            tokensAmount: '0',
            referralLink: '',
            earnedTokens: {}
        }
    }

    async componentDidMount () {
        // @ts-ignore
        const token = localStorage.getItem('token')
        // @ts-ignore
        const user = await ReMePalClient.getUserDetails(token)
        localStorage.setItem('user', JSON.stringify(user))

        const ethAmount = await BalanceService.ethAmount(user.wallet.address)
        const tokensAmount = await BalanceService.tokensAmount(user.wallet.address)

        this.setState({
            ethAmount,
            tokensAmount,
            referralLink: user.referralLink,
            earnedTokens: user.earnedTokens
        })
    }

    render (): ReactNode {
        // @ts-ignore
        // const email = JSON.parse(localStorage.getItem('user')).email

        return (
            <section className='wrapper homepage'>
                <Logout history={this.props.history} email={'email'} />
                <h2>Your home page</h2>
                <div className='common-wrapper'>
                    {DashboardRender(this)}
                    {/* <div className='claim'>
                        <div className='message'>You've got <strong>ReMC !ADD NUMBER!</strong> ready to be claimed.</div>
                        <button className='btn primary'>Claim now</button>
                    </div> */}

                    {/* <div className='claim'>
                        <div className='success-message'>Thank you for claiming your tokens.</div>
                    </div> */}
                </div>
            </section>
        )
    }
}

export default withoutAuth('/', Dashboard, '/dashboard')
