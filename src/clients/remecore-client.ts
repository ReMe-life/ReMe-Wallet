import { HTTPRequester } from './http-requester'

export class ReMeCoreClient {

    static async login (email: string, password: string) {
        const result = await HTTPRequester.post(
            `${process.env.REACT_APP_REMECORE_API}/auth/login`,
            { password, username: email }
        )

        return result
    }

}
