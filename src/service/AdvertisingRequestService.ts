import {AbstractService} from "./AbstractService";
import {AdvertisingRequest} from "../entity/AdvertisingRequest";

export class AdvertisingRequestService extends AbstractService<AdvertisingRequest> {


    async save(entity: AdvertisingRequest): Promise<AdvertisingRequest> {
        return super.save(entity);
    }

    async getAll(): Promise<AdvertisingRequest[]> {
        return await AdvertisingRequest.find({
            relations: [
                'id_location', 'id_estate_sub_category','id_estate_sub_category.id_estate_category',
                'id_transaction_type', 'id_user_info',
                'id_location.id_part_of_city','id_location.id_part_of_city.id_city'
            ]
        })
    }

    async update(entity: AdvertisingRequest): Promise<void> {
        return Promise.resolve(undefined);
    }

}
