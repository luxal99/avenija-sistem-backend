import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EstateSubCategory} from "./EstateSubCategory";


@Entity()
export class EstateCategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @OneToMany(type => EstateSubCategory, listOfEstateSubCategories => listOfEstateSubCategories.id_estate_category)
    listOfEstateSubCategories: EstateSubCategory[]
}
