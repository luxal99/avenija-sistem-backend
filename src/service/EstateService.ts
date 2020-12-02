import {AbstractService} from "./AbstractService";
import {Estate} from "../entity/Estate";
import {getConnection} from "typeorm";
import {Location} from "../entity/Location";
import {Image} from "../entity/Image";
import {ImageService} from "./ImageService";

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

    async getAllFavoritesEstate() {
        let listOfEstates: Array<Estate> = await this.getAll();
        let filtered = listOfEstates.filter(x => x.isFavorite === true)

        return filtered.map(item =>({
            id:item.id,
            title:item.title,
            price:item.price,
            coverImage:item.listOfImages[0].url
        }))

    }
    async getAllPromotedEstates() {
        let listOfEstates: Array<Estate> = await this.getAll();
        let filtered = listOfEstates.filter(x => x.isPromoted === true)

        return filtered.map(item =>({
            id:item.id,
            title:item.title,
            price:item.price,
            description:item.description,
            coverImage:item.listOfImages[0].url
        }))

    }
    async update(entity: Estate): Promise<void> {
        try {

            const estate = await this.findById(entity.id);

            const imageService = new ImageService();
            await getConnection().createQueryBuilder().relation(Estate, 'listOfAccessories').of(estate)
                .addAndRemove(entity.listOfAccessories, estate.listOfAccessories).then(async () => {
                    await getConnection().createQueryBuilder().update(Location).set({
                        address: entity.id_location.address,
                        id_part_of_city: entity.id_location.id_part_of_city
                    })
                        .where("id=:id", {id: entity.id_location.id})
                        .execute().then(async () => {
                            await getConnection().createQueryBuilder().update(Estate).set({
                                title: entity.title,
                                price: entity.price,
                                quadrature: entity.quadrature,
                                num_of_bathrooms: entity.num_of_bathrooms,
                                floor: entity.floor,
                                max_floor: entity.max_floor,
                                rooms: entity.rooms,
                                description: entity.description,
                                id_equipment: entity.id_equipment,
                                id_heating: entity.id_heating,
                                isFavorite: entity.isFavorite,
                                isPromoted: entity.isPromoted,
                                id_transaction_type: entity.id_transaction_type,
                                id_estate_sub_category: entity.id_estate_sub_category,
                                id_estate_type: entity.id_estate_type

                            }).where("id=:id", {id: entity.id}).execute().then(async () => {
                                for (let estateOldImg of estate.listOfImages) {
                                    await imageService.delete(estateOldImg)
                                }

                                for (let estateNewImage of entity.listOfImages) {
                                    await imageService.save(new Image(estateNewImage.title, estateNewImage.url, estateNewImage.id_estate))
                                }
                            })
                        })
                })
        } catch (e) {
            console.log(e)
        }


    }

    async getAll(): Promise<Estate[]> {
        let arr = await Estate.find({
            relations: [
                'listOfImages', 'id_estate_sub_category', 'id_estate_sub_category.id_estate_category', 'id_transaction_type',
                'id_heating', 'id_estate_type', 'id_equipment', 'id_location',
                'id_location.id_part_of_city', 'id_location.id_part_of_city.id_city', 'listOfAccessories'
            ]
        });


        return arr.reverse()
    }
}
