import {AbstractService} from "./AbstractService";
import {Heating} from "../entity/Heating";

export class HeatingService extends AbstractService<Heating> {


    async save(entity: Heating): Promise<Heating> {
        return super.save(entity);
    }
}
