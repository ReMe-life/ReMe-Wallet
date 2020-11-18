import BaseRepository from './baseRepository'

class Users extends BaseRepository {

    static instance: Users;

    public constructor () {
        if (!Users.instance) {
            super('users');
            Users.instance = this;
        }

        return Users.instance;
    }

    public async create (document: any): Promise<any> {
        document.id = document.email;
        return super.create(document);
    }

    public async getByEmail (email: any): Promise<any> {
        return super.getById(email);
    }

}

export default new Users()
