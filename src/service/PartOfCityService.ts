import {AbstractService} from "./AbstractService";
import {PartOfCity} from "../entity/PartOfCity";

export class PartOfCityService extends AbstractService<PartOfCity> {

    async save(entity: PartOfCity): Promise<PartOfCity> {
        return super.save(entity);
    }

    async getAll(): Promise<PartOfCity[]> {
        return await PartOfCity.find({relations:['id_city']})
    }


}
