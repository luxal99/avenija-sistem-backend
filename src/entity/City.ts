import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PartOfCity} from "./PartOfCity";
@Entity()
export class City extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title : string;

    @OneToMany(type => PartOfCity, listOfPartOfCities=>listOfPartOfCities.id_city)
    listOfPartOfCities:PartOfCity[]


    constructor(title?: string) {
        super();
        this.title = title;
    }
}
