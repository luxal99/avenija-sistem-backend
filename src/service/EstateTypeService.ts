import {AbstractService} from "./AbstractService";
import {EstateType} from "../entity/EstateType";

export class EstateTypeService extends AbstractService<EstateType> {

    async save(entity: EstateType): Promise<void> {
        await super.save(entity);
    }
}
