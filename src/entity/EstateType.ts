import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Estate} from "./Estate";

@Entity()
export class EstateType extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => Estate, listOfEstates => listOfEstates.id_estate_type)
    listOfEstates: Estate[];

    constructor(title?: string) {
        super();
        this.title = title;
    }
}
