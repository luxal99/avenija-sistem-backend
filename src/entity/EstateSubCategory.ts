import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EstateCategory} from "./EstateCategory";
import {Estate} from "./Estate";
import {AdvertisingRequest} from "./AdvertisingRequest";

@Entity()
export class EstateSubCategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => Estate, listOfEstates => listOfEstates.id_estate_sub_category)
    listOfEstates: Estate[]

    @OneToMany(type => AdvertisingRequest, listOfAdvertisingRequests => listOfAdvertisingRequests.id_estate_sub_category)
    listOfAdvertisingRequests: AdvertisingRequest[]

    @ManyToOne(type => EstateCategory, id => id.listOfEstateSubCategories)
    id_estate_category: EstateCategory


    constructor(title?: string, id_estate_category?: EstateCategory) {
        super();
        this.title = title;
        this.id_estate_category = id_estate_category;
    }
}
