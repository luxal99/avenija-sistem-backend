import {AbstractService} from "./AbstractService";
import {Accessories} from "../entity/Accessories";
import {getConnection} from "typeorm";

export class AccessoriesService extends AbstractService<Accessories> {
    async getAll(): Promise<Accessories[]> {
        return await Accessories.find();
    }


    async save(entity: Accessories): Promise<Accessories> {
        return super.save(entity);
    }

    async update(entity: Accessories): Promise<void> {
        await getConnection().createQueryBuilder().update(Accessories).set({
            title: entity.title
        }).where("id=:id",{id:entity.id}).execute()
    }
}
