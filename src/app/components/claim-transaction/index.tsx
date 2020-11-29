import { providers, Contract, Wallet } from 'ethers'
import React, { Component, ReactNode } from 'react'

import { PasswordConfirmationRender } from './renderers'

import { withAuth, withoutAuth } from '../HOCs'
import { ErrorPopUp } from '../../errors'
import { ReMePalClient } from '../../../clients'

type State = {
    txFee: string
    password: string
    contract: any
    claimData: any
    ethBalance: string
}

class ClaimTransaction extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.state = {
            txFee: '0',
            password: '',
            contract: {},
            claimData: {},
            ethBalance: this.props.history.location.state.ethBalance
        }
    }

    public async componentDidMount () {
        const provider = new providers.JsonRpcProvider(process.env.RECT_APP_BLOCKCHAIN_NETWORK)
        // @ts-ignore
        const contract = new Contract(process.env.RECT_APP_DISTRIBUTION_CONTRACT, JSON.stringify('abi'), provider)

        // @ts-ignore
        const token = localStorage.getItem('token')
        // @ts-ignore
        const claimData = await ReMePalClient.getClaimData(token)

        // @ts-ignore
        const user = JSON.parse(localStorage.getItem('user'))
        const txFee = await contract.estimateGas.claim(claimData.distributionIndex, claimData.proof, user.tokensForClaiming)

        if (txFee.gt(this.state.ethBalance)) {
            return this.props.history.push({
                pathname: '/insufficient-balance',
                state: {
                    txFee: txFee.toString(),
                    // @ts-ignore
                    address: JSON.parse(localStorage.getItem('user')).wallet.address
                }
            })
        }

        this.setState({
            contract,
            claimData,
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
            // @ts-ignore
            const user = JSON.parse(localStorage.getItem('user'))
            // @ts-ignore
            this.state.contract.connect(Wallet.fromEncryptedJson(user.wallet.json, this.state.password))
            this.state.contract.claim(
                this.state.claimData.distributionIndex,
                this.state.claimData.proof,
                user.tokensForClaiming
            )

            this.props.history.push({
                pathname: '/dashboard',
                state: {
                    txBroadcasted: true
                }
            })
        } catch (error) {
            console.log(error)
            ErrorPopUp.show('Incorrect password')
        }
    }
}

export default withoutAuth('/', ClaimTransaction, '/claim')
