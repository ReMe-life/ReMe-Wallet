import { HTTPRequester } from './http-requester'

class ReMeLifeClient {

    async login (email: string, password: string) {
        return HTTPRequester.post(
            `${process.env.REACT_APP_REME_API}/auth/login`,
            { password, username: email }
        )
    }

}

export default new ReMeLifeClient();
