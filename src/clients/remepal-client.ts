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

    static async getUserDetails (token: string): Promise<any> {
        const result = await HTTPRequester.get(
            `${process.env.REACT_APP_REMEPAL_API}/user`,
            { Authorization: `Bearer ${token}` }
        )

        return result
    }
}
