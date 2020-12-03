import copy from 'copy-to-clipboard';
import React, { Component, ReactNode } from 'react'

import { Logout } from '../logout'
import { DashboardRender } from './renderers'

import { withoutAuth } from '../HOCs'
import { clearLocalStorage } from '../helpers'

import { ReMePalClient } from '../../../clients'
import { BalanceService } from '../../../services'

type State = {
    email: string
    address: string
    ethBalance: string
    tokensBalance: string
    referralLink: string
    earnedTokens: any
    incomingTokens: string
    tokensForClaiming: string
    copiedCode: boolean
}

class Dashboard extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.claim = this.claim.bind(this)
        this.copyReferralCode = this.copyReferralCode.bind(this)

        this.state = {
            email: '',
            address: '',
            ethBalance: '0',
            tokensBalance: '0',
            referralLink: '',
            earnedTokens: {},
            incomingTokens: '0',
            tokensForClaiming: '0',
            copiedCode: false
        }
    }

    public async componentDidMount () {
        try {
            // @ts-ignore
            const token = localStorage.getItem('token')
            // @ts-ignore
            const user = await ReMePalClient.getUserDetails(token)
            localStorage.setItem('user', JSON.stringify(user))

            const ethBalance = await BalanceService.ethAmount(user.wallet.address)
            const tokensBalance = await BalanceService.tokensAmount(user.wallet.address)

            this.setState({
                email: user.email,
                address: user.wallet.address,
                ethBalance,
                tokensBalance,
                referralLink: `${window.location.protocol}//${window.location.host}/registration/${user.referralLink}`,
                earnedTokens: user.earnedTokens,
                incomingTokens: user.incomingTokens,
                tokensForClaiming: user.tokensForClaiming
            })
        } catch (error) {
            console.log(error)
            clearLocalStorage(this.props.history)
        }
    }

    public render (): ReactNode {
        return (
            <section className='wrapper homepage'>
                <Logout history={this.props.history} email={this.state.email} />
                <h2>Your home page</h2>
                <div className='common-wrapper'>
                    {DashboardRender(this)}
                    {this.state.tokensForClaiming === '0' ?
                        null :
                        <div className='claim'>
                            <div className='message'>You've got <strong>ReMC {this.state.tokensForClaiming}</strong> ready to be claimed.</div>
                            <button className='btn primary' onClick={this.claim}>Claim now</button>
                        </div>
                    }

                    {this.props.history.location &&
                        this.props.history.location.state &&
                        this.props.history.location.state.txBroadcasted ?
                        <div className='claim'>
                            <div className='success-message'>Thank you for claiming your tokens. Your transaction is being processed</div>
                        </div>
                        : null
                    }

                </div>
            </section>
        )
    }

    public async claim () {
        this.props.history.push({
            pathname: '/claim',
            state: {
                ethBalance: this.state.ethBalance
            }
        })
    }

    public copyReferralCode () {
        copy(this.state.referralLink)
        this.setState({ copiedCode: true })
    }
}

export default withoutAuth('/', Dashboard, '/dashboard')
