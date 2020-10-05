import {AbstractService} from "./AbstractService";
import {EstateCategory} from "../entity/EstateCategory";

export  class EstateCategoryService extends AbstractService<EstateCategory> {


    async save(entity: EstateCategory): Promise<EstateCategory> {
        return super.save(entity);
    }
}
