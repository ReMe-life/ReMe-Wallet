import Ethers from 'ethers';
import BLOCKCHAIN_CONFIG from './../config/blockchain-config.json';
import tokenContractAbi from './../app/assets/abis/IERC20.json'

class BalanceService {

    private static instance: BalanceService;
    private provider: any;
    private tokenContract: any;

    private constructor() {
        this.provider = new Ethers.providers.InfuraProvider(BLOCKCHAIN_CONFIG.network)
        this.tokenContract = new Ethers.Contract(BLOCKCHAIN_CONFIG.tokenAddress, tokenContractAbi.abi, this.provider)
    }

    static getInstance() {
        if(!BalanceService.instance) {
            BalanceService.instance = new BalanceService()
        }
        return BalanceService.instance
    }

    public async ethAmount (accountAddress: string): Promise<string> {                
        const ethAmount = await this.provider.getBalance(accountAddress);  
        return ethAmount.toString()
    }

    public async tokensAmount (accountAddress: string): Promise<string> {        
        const tokensAmount = await this.tokenContract.balanceOf(accountAddress);   
        return tokensAmount.toString()
    }

}

export default BalanceService.getInstance()

