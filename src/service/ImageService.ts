import {AbstractService} from "./AbstractService";
import {Image} from "../entity/Image";

export class ImageService extends AbstractService<Image> {

    async save(entity: Image): Promise<void> {
        await super.save(entity);
    }
}
