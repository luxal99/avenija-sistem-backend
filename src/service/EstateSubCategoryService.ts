import {AbstractService} from "./AbstractService";
import {EstateCategory} from "../entity/EstateCategory";
import {EstateSubCategory} from "../entity/EstateSubCategory";
import {getConnection} from "typeorm";
import {Equipment} from "../entity/Equipment";

export class EstateSubCategoryService extends AbstractService<EstateSubCategory> {


    async save(entity: EstateSubCategory): Promise<EstateSubCategory> {
        return super.save(entity);
    }

    async getAll(): Promise<EstateSubCategory[]> {
        return await EstateSubCategory.find({relations:['id_estate_category']})
    }

    async update(entity: EstateSubCategory): Promise<void> {
        await getConnection().createQueryBuilder().update(EstateSubCategory).set({
            title: entity.title,
            id_estate_category:entity.id_estate_category
        }).where("id=:id",{id:entity.id}).execute()
    }
}
