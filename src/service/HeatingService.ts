import {AbstractService} from "./AbstractService";
import {Heating} from "../entity/Heating";

export class HeatingService extends AbstractService<Heating> {
    async getAll(): Promise<Heating[]> {
        return await Heating.find()
    }


    async save(entity: Heating): Promise<Heating> {
        return super.save(entity);
    }
}
