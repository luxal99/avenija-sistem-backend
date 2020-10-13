import {AbstractService} from "./AbstractService";
import {AdvertisingRequest} from "../entity/AdvertisingRequest";

export class AdvertisingRequestService extends AbstractService<AdvertisingRequest> {


    async save(entity: AdvertisingRequest): Promise<AdvertisingRequest> {
        return super.save(entity);
    }

    async getAll(): Promise<AdvertisingRequest[]> {
        return Promise.resolve([]);
    }

    async update(entity: AdvertisingRequest): Promise<void> {
        return Promise.resolve(undefined);
    }

}
