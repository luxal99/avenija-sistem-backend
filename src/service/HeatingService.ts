import {AbstractService} from "./AbstractService";
import {Heating} from "../entity/Heating";

export class HeatingService extends AbstractService<Heating> {

    async save(entity: Heating): Promise<void> {
        await super.save(entity);
    }
}
