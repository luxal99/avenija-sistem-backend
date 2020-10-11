import {AbstractService} from "./AbstractService";
import {Estate} from "../entity/Estate";
import {getConnection} from "typeorm";

export class EstateService extends AbstractService<Estate> {


    async save(entity: Estate): Promise<Estate> {
        return super.save(entity);
    }

    async findById(id: number): Promise<Estate> {
        return await Estate.findOne({id: id}, {
            relations: ['listOfImages', 'id_estate_sub_category', 'id_estate_sub_category.id_estate_category', 'id_transaction_type',
                'id_heating', 'id_estate_type', 'id_equipment', 'id_location',
                'id_location.id_part_of_city', 'id_location.id_part_of_city.id_city', 'listOfAccessories']
        })
    }

    async delete(entity: Estate): Promise<void> {
        await super.delete(entity);
    }

    async update(entity: Estate): Promise<void> {

        console.log(entity)

        await getConnection().createQueryBuilder().relation(Estate,'listOfAccessories')
            .of(entity).
    }

    async getAll(): Promise<Estate[]> {
        return await Estate.find({
            relations: [
                'listOfImages', 'id_estate_sub_category', 'id_estate_sub_category.id_estate_category', 'id_transaction_type',
                'id_heating', 'id_estate_type', 'id_equipment', 'id_location',
                'id_location.id_part_of_city', 'id_location.id_part_of_city.id_city', 'listOfAccessories'
            ]
        });
    }
}
