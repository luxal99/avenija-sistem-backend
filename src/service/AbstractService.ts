import {BaseEntity, EntityManager, getManager} from "typeorm";


export abstract class AbstractService<T extends BaseEntity> {


    protected manager: EntityManager;
    protected entity:T;

    constructor() {
        this.manager = getManager();
    }

    async save(entity: T): Promise<T> {
        return await this.manager.save(entity);
    }



    async delete(entity: T) {
        await this.manager.remove(entity);
    }


    abstract async getAll():Promise<T[]>


}
