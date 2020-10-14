import {AbstractService} from "./AbstractService";
import {AdvertisingRequest} from "../entity/AdvertisingRequest";
import {getConnection} from "typeorm";

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
         await getConnection().createQueryBuilder().update(AdvertisingRequest).set({
            isReviewed:true
        }).where("id=:id",{id:entity.id}).execute()
    }

}
