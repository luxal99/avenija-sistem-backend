import {AbstractService} from "./AbstractService";
import {Heating} from "../entity/Heating";
import {getConnection} from "typeorm";
import {EstateSubCategory} from "../entity/EstateSubCategory";

export class HeatingService extends AbstractService<Heating> {
    async getAll(): Promise<Heating[]> {
        return await Heating.find()
    }


    async save(entity: Heating): Promise<Heating> {
        return super.save(entity);
    }

    async update(entity: Heating): Promise<void> {
        await getConnection().createQueryBuilder().update(Heating).set({
            title: entity.title
        }).where("id=:id",{id:entity.id}).execute()
    }
}
