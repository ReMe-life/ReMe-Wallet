import { HTTPRequester } from './http-requester'

export class ReMePalClient {

    static async createRRPUser (token: string, userAddress: string, referredBy: string): Promise<any> {
        const result = await HTTPRequester.post(
            `${process.env.REACT_APP_REMEPAL_API}/rrp/user`,
            { address: userAddress, referredBy },
            { Authorization: `Bearer ${token}` }
        )

        return result
    }

    static async getReferralAmount (token: string, userAddress: string): Promise<any> {
        const result = await HTTPRequester.get(
            `${process.env.REACT_APP_REMEPAL_API}/rrp/${userAddress}/amount`,
            { Authorization: `Bearer ${token}` }
        )

        return result
    }

    static async getReferralLink (token: string, userAddress: string): Promise<any> {
        const result = await HTTPRequester.get(
            `${process.env.REACT_APP_REMEPAL_API}/rrp/${userAddress}/link`,
            { Authorization: `Bearer ${token}` }
        )

        return result
    }

}
