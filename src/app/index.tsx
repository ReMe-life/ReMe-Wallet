import './index.scss'
import 'node_modules/reactjs-popup/dist/index.css';
import React, { Component, ReactNode } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApplicationBackground from './assets/images/background.6e81d4b2.jpg'


import {
	Login,
	Registration,
	Dashboard,
	Mnemonic,
	NewPassword,
	WalletRecovery,
	ClaimTransaction,
	ForgottenPassword,
	InsufficientBalance
} from './components'

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
			<div className='application' style={{backgroundImage: `url(${ApplicationBackground})`}}>
				{/*<Title />*/}
				<Router>
					<Route exact path="/" component={Login} />
					<Route path="/registration/:referredBy" component={Registration} />
					<Route exact path='/dashboard' component={Dashboard} />
					<Route exact path='/mnemonic' component={Mnemonic} />
					<Route exact path='/claim' component={ClaimTransaction} />
					<Route exact path='/insufficient-balance' component={InsufficientBalance} />
					<Route exact path='/forgotten-password' component={ForgottenPassword} />
					<Route path='/new-password/:id/:time/:token' component={NewPassword} />
					<Route exact path='/wallet-recovery' component={WalletRecovery} />
				</Router>
			</div>
		)
	}

}
