import BigNumber from 'bignumber.js'
import { ReMePalClient } from '../clients'
import { WalletService } from './wallet-service'

import { formatAmount } from './../utils'

export class UserService {

    static async register (email: string, password: string): Promise<any> {
        const wallet = await WalletService.randomWallet(password);
        const token = await ReMePalClient.register(
            { email, password },
            wallet
        )

        return { token, mnemonic: wallet.mnemonic }
    }

    static async registerByReferral (userDetails: any, referredBy: string): Promise<any> {
        const wallet = await WalletService.randomWallet(userDetails.password);
        const token = await ReMePalClient.registerByReferral(userDetails, wallet, referredBy)

        return { token, mnemonic: wallet.mnemonic }
    }

    static async login (email: string, password: string): Promise<any> {
        return ReMePalClient.login(email, password)
    }

    static async getUserDetails (token: string): Promise<any> {
        const result = await ReMePalClient.getUserDetails(token)
        result.incomingTokens = formatAmount(result.incomingTokens)
        result.tokensForClaiming = formatAmount(result.tokensForClaiming)

        const bnTokensForClaiming = new BigNumber(result.tokensForClaiming)

        result.claimTokens = {
            signup: new BigNumber(result.earnedTokens.signup).eq(0) ? formatAmount(result.signupTokens) : formatAmount('0'),
            referral: new BigNumber(result.earnedTokens.signup).eq(0) ? formatAmount(bnTokensForClaiming.multipliedBy('1000000000000000000').minus(result.signupTokens).toString()) : result.tokensForClaiming
        }

        return result
    }

    static async getClaimData (token: string): Promise<any> {
        return ReMePalClient.getClaimData(token)
    }
}
