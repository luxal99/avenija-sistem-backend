import {AbstractService} from "./AbstractService";
import {Estate} from "../entity/Estate";

export class EstateService extends AbstractService<Estate> {


    async save(entity: Estate): Promise<Estate> {
        return super.save(entity);
    }

    async getAll(): Promise<Estate[]> {
        return Promise.resolve([]);
    }
}
