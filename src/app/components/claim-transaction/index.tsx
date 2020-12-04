import React, { Component, ReactNode } from 'react'

import { PasswordConfirmationRender } from './renderers'

import { requireStateOrRedirectTo } from '../HOCs'
import { ErrorPopUp } from '../../errors'
import { ReMePalClient } from '../../../clients'
import { ClaimService } from '../../../services'


type State = {
    txFee: string
    password: string
    claimService: any
    ethBalance: string
    tokensForClaiming: string
}

class ClaimTransaction extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        if (this.props.history.location.state === undefined ||
            this.props.history.location.state.ethBalance === undefined) {
            return this.props.history.push('/dashboard')
        }

        this.onPassword = this.onPassword.bind(this)
        this.confirmTransaction = this.confirmTransaction.bind(this)

        this.state = {
            txFee: '0',
            password: '',
            claimService: {},
            ethBalance: this.props.history.location.state.ethBalance,
            tokensForClaiming: ''
        }
    }

    public async componentDidMount () {
        // @ts-ignore
        const token = localStorage.getItem('token')
        // @ts-ignore
        const claimData = await ReMePalClient.getClaimData(token)
        // @ts-ignore
        const user = JSON.parse(localStorage.getItem('user'))

        const claimService = new ClaimService(claimData, user.wallet)
        const txFee = await claimService.claimFee()

        if (txFee.gt(this.state.ethBalance)) {
            return this.props.history.push({
                pathname: '/insufficient-balance',
                state: {
                    txFee: txFee.toString(),
                    address: user.wallet.address
                }
            })
        }

        this.setState({
            txFee,
            claimService,
            tokensForClaiming: user.tokensForClaiming
        })
    }

    public render (): ReactNode {
        return (
            <section className='wrapper claim-wrapper'>
                <h2>Confirm transaction by entering your password</h2>
                <div className='common-wrapper'>
                    {PasswordConfirmationRender(this)}
                </div>
            </section>
        )
    }

    public onPassword (event: any) {
        this.setState({ password: event.target.value })
    }

    public async confirmTransaction () {
        try {
            await this.state.claimService.claim(this.state.password)

            this.props.history.push({
                pathname: '/dashboard',
                state: {
                    txBroadcasted: true
                }
            })
        } catch (error) {
            if (error.message.includes('Invalid Wallet')) {
                return ErrorPopUp.show('Incorrect password')
            }

            ErrorPopUp.show('Claim failed!')
        }
    }
}

export default requireStateOrRedirectTo(['ethBalance'], ClaimTransaction, '/claim', '/dashboard')
