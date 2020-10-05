import {BaseEntity, EntityManager, getManager} from "typeorm";


export class AbstractService<T extends BaseEntity> {

    T
    protected manager: EntityManager;


    constructor() {
        this.manager = getManager();
    }

    async save(entity: T): Promise<T> {
        return await this.manager.save(entity);
    }

    async delete(entity: T) {
        await this.manager.remove(entity);
    }


}
