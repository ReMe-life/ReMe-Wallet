import { abi } from './abi.json'

import { providers, Contract } from 'ethers';
import { WalletService } from '../wallet-service'

export class ClaimService {

    private proof: any[]
    private index: string
    private distributedTokens: string

    private contract: any
    private wallet: any

    public constructor (claimData: any, wallet: any) {
        this.proof = claimData.proof
        this.distributedTokens = claimData.distributedTokens
        this.index = claimData.distributionIndex

        this.wallet = wallet

        const provider = new providers.JsonRpcProvider(process.env.RECT_APP_BLOCKCHAIN_NETWORK)
        // @ts-ignore
        this.contract = new Contract(process.env.RECT_APP_DISTRIBUTION_CONTRACT, abi, provider)
    }

    public async claim (password: any) {
        try {
            this.contract.connect(WalletService.fromEncryptedJson(this.wallet.json, password))
        } catch (error) {
            console.log(error)
            throw new Error('Invalid Wallet')
        }

        return this.contract.claim(
            this.index,
            this.proof,
            this.distributedTokens
        )
    }

    public async claimFee () {
        return this.contract.estimateGas.claim(this.index, this.proof, this.distributedTokens)
    }
}
