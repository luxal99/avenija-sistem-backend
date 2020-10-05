import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Estate} from "./Estate";
@Entity()
export class Equipment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @OneToMany(type => Estate, listOfEstates => listOfEstates.id_equipment)
    listOfEstates: Estate[]


    constructor(title?: string) {
        super();
        this.title = title;
    }
}
