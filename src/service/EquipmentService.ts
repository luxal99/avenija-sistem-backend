import {AbstractService} from "./AbstractService";
import {Equipment} from "../entity/Equipment";
import {Accessories} from "../entity/Accessories";

export class EquipmentService extends AbstractService<Equipment> {


    async save(entity: Accessories): Promise<Accessories> {
        return super.save(entity);
    }
}
