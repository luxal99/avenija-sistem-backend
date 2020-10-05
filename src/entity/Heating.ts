import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Estate} from "./Estate";

@Entity()
export class Heating extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => Estate,listOfEstates=>listOfEstates.id_heating)
    listOfEstates:Estate[];
}
