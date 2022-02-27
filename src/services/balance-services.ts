import * as ethers from 'ethers';
import tokenContractAbi from './../app/assets/abis/IERC20.json'

import { formatAmount } from './../utils'

class BalanceService {

    private static instance: BalanceService;
    private provider: any;
    private tokenContract: any;

    private constructor () {
        this.provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_BLOCKCHAIN_NETWORK)
        this.tokenContract = new ethers.Contract(process.env.REACT_APP_TOKEN_CONTRACT || '', tokenContractAbi.abi, this.provider)
    }

    static getInstance () {
        if (!BalanceService.instance) {
            BalanceService.instance = new BalanceService()
        }
        return BalanceService.instance
    }

    public async ethAmount (accountAddress: string): Promise<any> {
        const ethAmount = await this.provider.getBalance(accountAddress);
        return {
            pure: ethAmount.toString(),
            formatted: formatAmount(ethAmount.toString())
        }
    }

    public async tokensAmount (accountAddress: string): Promise<any> {
        const tokensAmount = await this.tokenContract.balanceOf(accountAddress);
        return {
            pure: tokensAmount.toString(),
            formatted: formatAmount(tokensAmount.toString())
        }
    }
}

export default BalanceService.getInstance()

