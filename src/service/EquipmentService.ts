import {AbstractService} from "./AbstractService";
import {Equipment} from "../entity/Equipment";
import {Accessories} from "../entity/Accessories";
import {getConnection} from "typeorm";
import {City} from "../entity/City";

export class EquipmentService extends AbstractService<Equipment> {


    async save(entity: Accessories): Promise<Accessories> {
        return super.save(entity);
    }

    async getAll(): Promise<Equipment[]> {
        return await Equipment.find()
    }

    async update(entity: Equipment): Promise<void> {
        await getConnection().createQueryBuilder().update(Equipment).set({
            title: entity.title
        }).where("id=:id",{id:entity.id}).execute()
    }


}
