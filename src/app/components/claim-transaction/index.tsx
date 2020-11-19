import React, { Component, ReactNode } from 'react'

import { PasswordConfirmationRender } from './renderers'

import { withoutAuth } from '../HOCs'

type State = {}

class ClaimTransaction extends Component<{ history: any }, State> {

    render(): ReactNode {
        return (
            <section className='wrapper claim-wrapper'>
                <h2>Confirm transaction by entering your password</h2>
                <div className='common-wrapper'>
                    {PasswordConfirmationRender(this)}
                </div>
            </section>
        )
    }
}

export default withoutAuth('/', ClaimTransaction, '/claim')
