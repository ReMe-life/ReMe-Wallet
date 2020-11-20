import './index.scss'
import React, { Component, ReactNode } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Title, Auth, Footer, Dashboard, Mnemonic, ClaimTransaction, InsuffitientBalance } from './components'

type State = {
	component: any
	email: any
	password: any
}

export class App extends Component<{}, State> {

	public constructor (props: any) {
		super(props)
	}

	public render (): ReactNode {
		return (
			<div className='application'>
				<Title />
				<Router>
					<Route exact path="/" component={Auth} />
					<Route exact path='/dashboard' component={Dashboard} />
					<Route exact path='/mnemonic' component={Mnemonic} />
					<Route exact path='/claim' component={ClaimTransaction} />
					<Route exact path='/insufficient-balance' component={InsuffitientBalance} />
				</Router>
				<Footer />
			</div>
		)
	}

}
