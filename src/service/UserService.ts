import {AbstractService} from "./AbstractService";
import {User} from "../entity/User";

export class UserService extends AbstractService<User> {


    async save(entity: User): Promise<User> {
        return super.save(entity);
    }

    async findByName(name: string): Promise<User> {
        return await this.manager.findOne(User, {username: name});
    }

    async getAll(): Promise<User[]> {
        return Promise.resolve([]);
    }

}
