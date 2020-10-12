import {AbstractService} from "./AbstractService";
import {EstateCategory} from "../entity/EstateCategory";
import {getConnection} from "typeorm";
import {Equipment} from "../entity/Equipment";

export  class EstateCategoryService extends AbstractService<EstateCategory> {


    async save(entity: EstateCategory): Promise<EstateCategory> {
        return super.save(entity);
    }

    async getAll(): Promise<EstateCategory[]> {
        return await EstateCategory.find({relations:['listOfEstateSubCategories']})
    }

    async update(entity: EstateCategory): Promise<void> {
        await getConnection().createQueryBuilder().update(EstateCategory).set({
            title: entity.title
        }).where("id=:id",{id:entity.id}).execute()
    }
}
