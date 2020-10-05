import {AbstractService} from "./AbstractService";
import {TransactionType} from "../entity/TransactionType";

export class TransactionTypeService extends AbstractService<TransactionType> {


    async save(entity: TransactionType): Promise<TransactionType> {
        return super.save(entity);
    }
}
