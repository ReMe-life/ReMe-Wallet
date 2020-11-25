import { ReMePalClient } from '../clients'
import { WalletService } from './wallet-service'

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
        // const token = await ReMePalClient.registerByReferral(userDetails, wallet, referredBy)
        const token = '123'
        return { token, mnemonic: wallet.mnemonic }
    }

    static async login (email: string, password: string): Promise<any> {
        return ReMePalClient.login(email, password)
    }

    static logout (): void {
        localStorage.clearItem('user')
        localStorage.clearItem('token')
    }

}
