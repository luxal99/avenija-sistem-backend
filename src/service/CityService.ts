import {AbstractService} from "./AbstractService";
import {City} from "../entity/City";

export class CityService extends AbstractService<City> {

    async save(entity: City): Promise<void> {
        await super.save(entity);
    }


}
