import {AbstractService} from "./AbstractService";
import {User} from "../entity/User";
import {UserInfo} from "../entity/UserInfo";

export class UserInfoService extends AbstractService<UserInfo> {


    async save(entity: UserInfo): Promise<UserInfo> {
        return super.save(entity);
    }

    async getAll(): Promise<UserInfo[]> {
        return Promise.resolve([]);
    }

    async update(entity: UserInfo): Promise<void> {
        return Promise.resolve(undefined);
    }
}
