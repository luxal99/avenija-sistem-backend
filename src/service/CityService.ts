import {AbstractService} from "./AbstractService";
import {City} from "../entity/City";
import {Accessories} from "../entity/Accessories";
import {getConnection} from "typeorm";

export class CityService extends AbstractService<City> {


    async save(entity: City): Promise<City> {
        return super.save(entity);
    }

    async getAll(): Promise<City[]> {
        return await this.manager.find(City);
    }

    async update(entity: City): Promise<void> {
        await getConnection().createQueryBuilder().update(City).set({
            title: entity.title
        }).where("id=:id",{id:entity.id}).execute()
    }

}
