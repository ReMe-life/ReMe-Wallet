import firebase from 'firebase/app';
import 'firebase/auth';

import DB_CONFIG from '../config/db-config.json'

class FirebaseClient {

    public constructor () {
        firebase.initializeApp(DB_CONFIG);
    }

    public async register (email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    public async login (email: string, password: string): Promise<any> {
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            return user;
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                return undefined;
            }

            throw error;
        }
    }

    public async logout (): Promise<any> {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            throw new Error(`User was not logout: ${error.message}`)
        }
    }

}

export default new FirebaseClient();
