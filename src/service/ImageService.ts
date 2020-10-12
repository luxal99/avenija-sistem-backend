import {AbstractService} from "./AbstractService";
import {Image} from "../entity/Image";

export class ImageService extends AbstractService<Image> {


    async save(entity: Image): Promise<Image> {
        return super.save(entity);
    }


    async delete(entity: Image): Promise<void> {
        await super.delete(entity);
    }

    async getAll(): Promise<Image[]> {
        return await Image.find({relations:['id_estate']});
    }

    async update(entity: Image): Promise<void> {
        return Promise.resolve(undefined);
    }
}
