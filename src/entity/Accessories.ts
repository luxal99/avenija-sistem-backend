import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Estate} from "./Estate";
@Entity()
export class Accessories extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(type => Estate, estate => estate.listOfAccessories)
    listOfEstates: Estate[];
}
