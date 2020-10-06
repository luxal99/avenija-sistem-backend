import {AbstractService} from "./AbstractService";
import {Image} from "../entity/Image";

export class ImageService extends AbstractService<Image> {


    async save(entity: Image): Promise<Image> {
        return super.save(entity);
    }

    async getAll(): Promise<Image[]> {
        return Promise.resolve([]);
    }
}
