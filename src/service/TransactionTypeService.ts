import {AbstractService} from "./AbstractService";
import {TransactionType} from "../entity/TransactionType";

export class TransactionTypeService extends AbstractService<TransactionType> {


    async save(entity: TransactionType): Promise<TransactionType> {
        return super.save(entity);
    }

    async getAll(): Promise<TransactionType[]> {
        return await TransactionType.find();
    }

    async update(entity: TransactionType): Promise<void> {
        return Promise.resolve(undefined);
    }
}
