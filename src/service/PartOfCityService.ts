import {AbstractService} from "./AbstractService";
import {PartOfCity} from "../entity/PartOfCity";
import {getConnection} from "typeorm";
import {Heating} from "../entity/Heating";

export class PartOfCityService extends AbstractService<PartOfCity> {

    async save(entity: PartOfCity): Promise<PartOfCity> {
        return super.save(entity);
    }

    async getAll(): Promise<PartOfCity[]> {
        return await PartOfCity.find({relations:['id_city']})
    }

    async update(entity: PartOfCity): Promise<void> {
        await getConnection().createQueryBuilder().update(PartOfCity).set({
            title: entity.title,
            id_city:entity.id_city
        }).where("id=:id",{id:entity.id}).execute()
    }


}
