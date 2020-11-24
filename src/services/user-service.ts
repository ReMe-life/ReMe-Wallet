import { ReMePalClient, ReMeCoreClient, FirebaseClient } from '../clients'
import { WalletService } from './wallet-service'

import { Users } from '../database/repositories';

export class UserService {

    static async register (email: string, password: string): Promise<any> {
        const token = await ReMeCoreClient.login(email, password);
        const user = await FirebaseClient.register(email, password);

        const tokensAmount = 10;
        const userWallet = await WalletService.randomWallet(password);

        await Users.create({
            email,
            ethAddress: userWallet.address,
            wallet: userWallet.json,
            tokens: tokensAmount
        });

        await ReMePalClient.createRRPUser(token, userWallet.address, '');
        return { data: user, wallet: userWallet, token }
    }

    static async login (email: string, password: string): Promise<any> {
        const token = await ReMeCoreClient.login(email, password);

        const user = await FirebaseClient.login(email, password);
        if (user) {
            const userData = await Users.getByEmail(email);
            const userWallet = await WalletService.fromEncryptedJson(userData.wallet, password);

            return { data: user, wallet: userWallet, token }
        }
    }

    static async logout (): Promise<void> {
        return FirebaseClient.logout();
    }

}
