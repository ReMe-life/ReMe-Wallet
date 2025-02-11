import copy from 'copy-to-clipboard';
import React, { Component, ReactNode } from 'react'

import { Logout } from '../logout'
import { DashboardRender } from './renderers'

import { withoutAuth } from '../HOCs'
import { clearLocalStorage } from '../helpers'

import { BalanceService, UserService } from '../../../services'

type State = {
    email: string
    address: string
    ethBalance: any
    tokensBalance: any
    referralCode: string
    referralPlatformUserLink: string
    claimTokens: any
    tokensForClaiming: string
    copiedCode: boolean
    copiedWalletAddress: boolean
    txBroadcasted: boolean
    full_name: string
}

class Dashboard extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.claim = this.claim.bind(this)
        this.copyReferralCode = this.copyReferralCode.bind(this)
        this.copyWalletAddress = this.copyWalletAddress.bind(this)

        const txBroadcasted = this.props.history.location.state && this.props.history.location.state.txBroadcasted
        if (txBroadcasted) {
            let state = { ...this.props.history.location.state };
            delete state.txBroadcasted;
            this.props.history.replace({ ...this.props.history.location, state });
        }

        this.state = {
            email: '',
            address: '',
            ethBalance: {},
            tokensBalance: {},
            referralCode: '',
            referralPlatformUserLink: '',
            claimTokens: {},
            tokensForClaiming: '0.0000',
            copiedCode: false,
            copiedWalletAddress: false,
            txBroadcasted,
            full_name: ''
        }
    }

    public async componentDidMount () {
        try {
            const token = localStorage.getItem('token') || ''
            const encToken = localStorage.getItem('encToken')
            console.log('encToken getting from local')
            console.log(encToken)

            const user = await UserService.getUserDetails(token)
            localStorage.setItem('user', JSON.stringify(user))
            const ethBalance = await BalanceService.ethAmount(user.wallet.address)
            const tokensBalance = await BalanceService.tokensAmount(user.wallet.address)

            this.setState({
                email: user.email,
                address: user.wallet.address,
                ethBalance,
                tokensBalance,
                referralCode: `${window.location.protocol}//${window.location.host}/registration/${user.referralLink}`,
                referralPlatformUserLink: `${process.env.REACT_APP_REMEPAL_PLATFORM}?authtoken=${encodeURIComponent(encToken || '')}`,
                claimTokens: user.claimTokens,
                tokensForClaiming: user.tokensForClaiming,
                full_name: user.full_name
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
                <div className='common-wrapper'>
                    {DashboardRender(this)}
                    {this.state.tokensForClaiming === '0.0000' || this.state.txBroadcasted ?
                        null :
                        <div className='claim'>
                            <button className='btn primary' onClick={this.claim} disabled={true}>COMING SOON</button>
                        </div>
                    }

                    {this.state.txBroadcasted ?
                        <div className='claim'>
                            <div className='message'>Your transaction is being processed</div>
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
                ethBalance: this.state.ethBalance.pure
            }
        })
    }

    public copyWalletAddress () {
        copy(this.state.address)
        this.setState({ copiedWalletAddress: true })
    }

    public copyReferralCode () {
        copy(this.state.referralCode)
        this.setState({ copiedCode: true })
    }
}

export default withoutAuth('/', Dashboard, '/dashboard')
