import {AbstractService} from "./AbstractService";
import {User} from "../entity/User";

export class UserService extends AbstractService<User> {


    async save(entity: User): Promise<User> {
        return super.save(entity);
    }

    async findByName(name: string): Promise<User> {
        return await this.manager.findOne(User, {username: name}, {relations: ['id_role', 'id_user_info']});
    }

    async getAll(): Promise<User[]> {
        return await User.find({relations: ['id_role', 'id_user_info']});
    }

    async update(entity: User): Promise<void> {
        return Promise.resolve(undefined);
    }

}
