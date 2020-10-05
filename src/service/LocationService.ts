import {AbstractService} from "./AbstractService";
import {Location} from "../entity/Location";

export class LocationService extends AbstractService<Location> {

    async save(entity: Location): Promise<void> {
        await super.save(entity);
    }
}
