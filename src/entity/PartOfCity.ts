import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {City} from "./City";
import {Location} from "./Location";

@Entity()
export class PartOfCity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(type => City, id => id.listOfPartOfCities)
    id_city: City;

    @OneToMany(type => Location, listOfLocations => listOfLocations.id_part_of_city)
    listOfLocations: Location[];

    constructor(title?: string, id_city?: City) {
        super();
        this.title = title;
        this.id_city = id_city;
    }
}
