import { HTTPRequester } from './http-requester'

class ReMeLifeClient {

    async login (email: string, password: string) {
        const result = await HTTPRequester.post(
            `${process.env.REACT_APP_REME_API}/auth/login`,
            { password, username: email }
        )

        return result
    }

}

export default new ReMeLifeClient();
