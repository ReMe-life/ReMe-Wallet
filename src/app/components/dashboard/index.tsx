import React, { Component, ReactNode } from 'react'

import { DashboardRender } from './renderers'

import { Logout } from '../logout'
import { withoutAuth } from '../HOCs'

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
        // @ts-ignore
        const email = JSON.parse(localStorage.getItem('userData')).user.email
        return (
            <section className='wrapper homepage'>
                <Logout history={this.props.history} email={email} />
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
