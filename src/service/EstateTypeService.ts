import {AbstractService} from "./AbstractService";
import {EstateType} from "../entity/EstateType";

export class EstateTypeService extends AbstractService<EstateType> {


    async save(entity: EstateType): Promise<EstateType> {
        return super.save(entity);
    }

    async getAll(): Promise<EstateType[]> {
        return Promise.resolve([]);
    }
}
