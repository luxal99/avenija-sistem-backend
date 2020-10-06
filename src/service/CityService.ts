import {AbstractService} from "./AbstractService";
import {City} from "../entity/City";
import {Accessories} from "../entity/Accessories";

export class CityService extends AbstractService<City> {


    async save(entity: City): Promise<City> {
        return super.save(entity);
    }

    async getAll(): Promise<City[]> {
        return await this.manager.find(City);
    }

}
