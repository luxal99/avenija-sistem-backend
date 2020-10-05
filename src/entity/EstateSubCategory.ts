import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EstateCategory} from "./EstateCategory";
import {Estate} from "./Estate";

@Entity()
export class EstateSubCategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => Estate, listOfEstates => listOfEstates.id_estate_sub_category)
    listOfEstates: Estate[]

    @ManyToOne(type => EstateCategory, id => id.listOfEstateSubCategories)
    id_estate_category: EstateCategory
}
