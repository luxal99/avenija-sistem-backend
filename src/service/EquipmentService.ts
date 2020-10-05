import {AbstractService} from "./AbstractService";
import {Equipment} from "../entity/Equipment";

export class EquipmentService extends AbstractService<Equipment> {

    async save(entity: Equipment): Promise<void> {
        await super.save(entity);
    }
}
