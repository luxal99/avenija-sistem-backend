import {AbstractService} from "./AbstractService";
import {EstateCategory} from "../entity/EstateCategory";
import {EstateSubCategory} from "../entity/EstateSubCategory";

export class EstateSubCategoryService extends AbstractService<EstateSubCategory> {

    async save(entity: EstateSubCategory): Promise<void> {
        await super.save(entity);
    }
}
