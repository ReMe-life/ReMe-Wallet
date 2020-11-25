import { HTTPRequester } from './http-requester'

export class ReMePalClient {

    static async register (details: any, wallet: any): Promise<any> {
        const result = await HTTPRequester.post(
            `${process.env.REACT_APP_REMEPAL_API}/auth/register`,
            {
                ...details,
                wallet,
            }
        )

        return result.token
    }

    static async registerByReferral (details: any, wallet: any, referredBy: string): Promise<any> {
        const result = await HTTPRequester.post(
            `${process.env.REACT_APP_REMEPAL_API}/auth/register`,
            {
                ...details,
                wallet,
                referredBy
            }
        )

        return result.token
    }

    static async login (email: string, password: string): Promise<any> {
        const result = await HTTPRequester.post(
            `${process.env.REACT_APP_REMEPAL_API}/auth/login`,
            { email, password }
        )

        return result.token
    }

    // Todo: Get all user info here
    static async getUserDetails (token: string): Promise<any> {
        return {}
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
