import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Estate} from "./Estate";

@Entity()
export class Image extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(type => Estate, id => id.listOfImages)
    id_estate: Estate


    constructor(url?: string, id_estate?: Estate) {
        super();
        this.url = url;
        this.id_estate = id_estate;
    }
}
