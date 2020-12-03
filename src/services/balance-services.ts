import * as ethers from 'ethers';
import BLOCKCHAIN_CONFIG from './../config/blockchain-config.json';
import tokenContractAbi from './../app/assets/abis/IERC20.json'

class BalanceService {

    private static instance: BalanceService;
    private provider: any;
    private tokenContract: any;

    private constructor () {
        this.provider = new ethers.providers.InfuraProvider(BLOCKCHAIN_CONFIG.network)
        this.tokenContract = new ethers.Contract(BLOCKCHAIN_CONFIG.tokenAddress, tokenContractAbi.abi, this.provider)
    }

    static getInstance () {
        if (!BalanceService.instance) {
            BalanceService.instance = new BalanceService()
        }
        return BalanceService.instance
    }

    public async ethAmount (accountAddress: string): Promise<string> {
        const ethAmount = await this.provider.getBalance(accountAddress);
        return this.formatAmount(ethAmount.toString())
    }

    public async tokensAmount (accountAddress: string): Promise<string> {
        const tokensAmount = await this.tokenContract.balanceOf(accountAddress);
        return this.formatAmount(tokensAmount.toString())
    }

    private formatAmount (amount: string): string {
        if (amount.length <= 1) {
            return amount
        }

        const formattedAmount = amount.padStart(19, '0')
        const fractionPart = formattedAmount.substr(formattedAmount.length - 18).substr(0, 4)
        const intPart = formattedAmount.substr(0, formattedAmount.length - 18)

        return `${intPart}.${fractionPart}`
    }
}

export default BalanceService.getInstance()

