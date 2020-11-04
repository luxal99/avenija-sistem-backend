import {AbstractService} from "./AbstractService";
import {User} from "../entity/User";
import bcrypt = require("bcrypt");
import {getConnection} from "typeorm";

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
        await getConnection().createQueryBuilder().update(User).set({
            username: entity.username,
            password: entity.password
        })
            .where("id=:id", {id: entity.id}).execute()
    }

    async findByHashedUsername(hash): Promise<string> {
        const listOfUsers: Array<User> = await this.getAll();

        for (const user of listOfUsers) {
            if (await bcrypt.compare(user.username, hash)) {
                console.log(user.username)
                return user.username
            }
        }

        return "";
    }

}
