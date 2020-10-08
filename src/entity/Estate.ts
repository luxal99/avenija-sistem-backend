import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Image} from "./Image";
import {EstateSubCategory} from "./EstateSubCategory";
import {TransactionType} from "./TransactionType";
import {Heating} from "./Heating";
import {Equipment} from "./Equipment";
import {Accessories} from "./Accessories";
import {EstateType} from "./EstateType";


@Entity()
export class Estate extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @Column()
    description: string


    @Column()
    price: number;


    @Column()
    quadrature: number


    @Column()
    num_of_bathrooms:number


    @Column()
    floor: number


    @Column()
    max_floor: number;


    @Column()
    rooms: number;


    @Column()
    parking: boolean

    @OneToMany(type => Image, listOfImages => listOfImages.id_estate)
    listOfImages: Image[]

    @ManyToOne(type => EstateSubCategory, id => id.listOfEstates)
    id_estate_sub_category: EstateSubCategory;

    @ManyToOne(type => TransactionType, id => id.listOfEstates)
    id_transaction_type: TransactionType;

    @ManyToOne(type => Heating, id => id.listOfEstates)
    id_heating: Heating

    @ManyToOne(type => EstateType, id => id.listOfEstates)
    id_estate_type: EstateType

    @ManyToOne(type => Equipment, id => id.listOfEstates)
    id_equipment: Equipment


    @ManyToMany(type => Accessories, estate => estate.listOfEstates)
    listOfAccessories: Accessories[];

}
