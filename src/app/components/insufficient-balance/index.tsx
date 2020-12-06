import React, { Component, ReactNode } from 'react'

import { requireStateOrRedirectTo } from '../HOCs'
import { InsufficientBalanceRender } from './renderers'

type State = {
    txFee: string,
    address: string
}

class InsufficientBalance extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.redirectToDashboard = this.redirectToDashboard.bind(this)
        this.redirectToCoinbase = this.redirectToCoinbase.bind(this)

        this.state = {
            txFee: this.props.history.location.state.txFee,
            address: this.props.history.location.state.address
        }
    }

    public render (): ReactNode {
        return (
            <section className='wrapper balance-wrapper'>
                <h2>ETH balance insufficient</h2>
                <div className='common-wrapper'>
                    {InsufficientBalanceRender(this)}
                </div>
            </section>
        )
    }

    public redirectToDashboard () {
        this.props.history.push('/dashboard')
    }

    public redirectToCoinbase () {
        window.open('https://www.coinbase.com/')
    }
}

export default requireStateOrRedirectTo(
    ['txFee', 'address'],
    InsufficientBalance,
    '/insufficient-balance',
    '/dashboard'
)
