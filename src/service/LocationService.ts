import {AbstractService} from "./AbstractService";
import {Location} from "../entity/Location";

export class LocationService extends AbstractService<Location> {


    async save(entity: Location): Promise<Location> {
        return super.save(entity);
    }

    async getAll(): Promise<Location[]> {
        return Promise.resolve([]);
    }
}
