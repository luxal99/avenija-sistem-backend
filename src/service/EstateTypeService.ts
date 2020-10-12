import {AbstractService} from "./AbstractService";
import {EstateType} from "../entity/EstateType";
import {getConnection} from "typeorm";
import {Equipment} from "../entity/Equipment";

export class EstateTypeService extends AbstractService<EstateType> {

    async update(entity: EstateType): Promise<void> {
        await getConnection().createQueryBuilder().update(EstateType).set({
            title: entity.title
        }).where("id=:id",{id:entity.id}).execute()
    }


    async save(entity: EstateType): Promise<EstateType> {
        return super.save(entity);
    }

    async getAll(): Promise<EstateType[]> {
        return EstateType.find()
    }
}
