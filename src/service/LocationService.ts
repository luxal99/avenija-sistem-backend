import {AbstractService} from "./AbstractService";
import {Location} from "../entity/Location";
import {Estate} from "../entity/Estate";
import {getConnection} from "typeorm";

export class LocationService extends AbstractService<Location> {


    async save(entity: Location): Promise<Location> {
        return super.save(entity);
    }

    async findById(id: number): Promise<Location> {
        return await Location.findOne({id: id})
    }

    async update(entity: Location): Promise<void> {
        await getConnection().createQueryBuilder().update(Location).set({})
            .where("id=:id", {id: entity.id}).execute()
    }


    async delete(entity: Location): Promise<void> {
        await super.delete(entity);
    }

    async getAll(): Promise<Location[]> {
        return Promise.resolve([]);
    }
}
