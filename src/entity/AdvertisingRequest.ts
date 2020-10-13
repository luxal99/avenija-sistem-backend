import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Location} from "./Location";
import {EstateSubCategory} from "./EstateSubCategory";

@Entity()
export class AdvertisingRequest extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quadrature: number;

    @Column()
    priceFrom: number


    @Column()
    priceTo: number

    @Column()
    isReviewed: boolean


    @Column({length: 10240})
    description: string

    @OneToOne(type => Location)
    @JoinColumn()
    id_location: Location

    @ManyToOne(type => EstateSubCategory, id => id.listOfAdvertisingRequests)
    id_estate_sub_category: EstateSubCategory;

    constructor() {
        super();
        this.isReviewed = false
    }


}
