import {AbstractService} from "./AbstractService";
import {Accessories} from "../entity/Accessories";

export class AccessoriesService extends AbstractService<Accessories> {
    async getAll(): Promise<Accessories[]> {
        return await Accessories.find();
    }


    async save(entity: Accessories): Promise<Accessories> {
        return super.save(entity);
    }
}
