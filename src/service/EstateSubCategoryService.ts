import {AbstractService} from "./AbstractService";
import {EstateCategory} from "../entity/EstateCategory";
import {EstateSubCategory} from "../entity/EstateSubCategory";

export class EstateSubCategoryService extends AbstractService<EstateSubCategory> {


    async save(entity: EstateSubCategory): Promise<EstateSubCategory> {
        return super.save(entity);
    }

    async getAll(): Promise<EstateSubCategory[]> {
        return Promise.resolve([]);
    }
}
