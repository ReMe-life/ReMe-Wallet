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
    referralAmount: string
}

class Dashboard extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.state = {
            ethAmount: '0',
            tokensAmount: '0',
            referralLink: '0',
            referralAmount: '0'
        }
    }

    async componentDidMount () {
        if (localStorage.getItem('user')) {
            // @ts-ignore
            const user = JSON.parse(localStorage.getItem('user'))
            const ethAmount = await BalanceService.ethAmount(user.wallet.address)
            const tokensAmount = await BalanceService.tokensAmount(user.wallet.address)

            const referralLink = await ReMePalClient.getReferralLink(user.token, user.wallet.address)
            const referralAmount = await ReMePalClient.getReferralAmount(user.token, user.wallet.address)

            this.setState({ ethAmount, tokensAmount, referralLink, referralAmount })
        }
    }

    render (): ReactNode {
        // @ts-ignore
        const email = JSON.parse(localStorage.getItem('user')).data.user.email
        return (
            <section className='wrapper homepage'>
                <Logout history={this.props.history} email={email} />
                <h2>Your home page</h2>
                <h2>Referral Link: {this.state.referralLink}</h2>
                <h2>Referral Amount: {this.state.referralAmount}</h2>

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
