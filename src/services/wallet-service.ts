import { Wallet } from 'ethers'

export class WalletService {

    static async randomWallet (password: string) {
        const wallet = Wallet.createRandom();
        const walletJson = await wallet.encrypt(password);

        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic,
            json: walletJson
        }
    }

    static async fromEncryptedJson (json: any, password: string): Promise<Wallet> {
        return Wallet.fromEncryptedJson(json, password);
    }

    static fromMnemonic (mnemonic: any): Wallet {
        return Wallet.fromMnemonic(mnemonic);
    }
}
