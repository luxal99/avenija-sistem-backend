import {AbstractService} from "./AbstractService";
import {Accessories} from "../entity/Accessories";

export class AccessoriesService extends AbstractService<Accessories> {


    async save(entity: Accessories): Promise<Accessories> {
        return super.save(entity);
    }
}
