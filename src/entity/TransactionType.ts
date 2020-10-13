import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Estate} from "./Estate";
import {AdvertisingRequest} from "./AdvertisingRequest";

@Entity()
export class TransactionType extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => Estate, listOfEstates => listOfEstates.id_transaction_type)
    listOfEstates: Estate[]

    @OneToMany(type => AdvertisingRequest, listOfEstates => listOfEstates.id_transaction_type)
    listOfAdvertisingRequests: AdvertisingRequest[]

}
