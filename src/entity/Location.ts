import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PartOfCity} from "./PartOfCity";

@Entity()
export class Location extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @ManyToOne(type => PartOfCity,id=>id.listOfLocations)
    id_part_of_city:PartOfCity


    constructor(address?: string, id_part_of_city?: PartOfCity) {
        super();
        this.address = address;
        this.id_part_of_city = id_part_of_city;
    }
}
