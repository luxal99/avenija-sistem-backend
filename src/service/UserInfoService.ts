import {AbstractService} from "./AbstractService";
import {User} from "../entity/User";
import {UserInfo} from "../entity/UserInfo";

export class UserInfoService extends AbstractService<UserInfo> {


    async save(entity: UserInfo): Promise<UserInfo> {
        return super.save(entity);
    }
}
