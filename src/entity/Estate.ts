import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Image} from "./Image";
import {EstateSubCategory} from "./EstateSubCategory";
import {TransactionType} from "./TransactionType";
import {Heating} from "./Heating";
import {Equipment} from "./Equipment";
import {Accessories} from "./Accessories";
import {EstateType} from "./EstateType";
import {Location} from "./Location";


@Entity()
export class Estate extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @Column({length: 10240})
    description: string


    @Column({default: 0})
    price: number;


    @Column({default: 0})
    quadrature: number


    @Column({default: 0})
    num_of_bathrooms: number


    @Column({default: 0})
    floor: number


    @Column({default: 0})
    max_floor: number;


    @Column({default: 0})
    rooms: number;

    @Column({default: false})
    isFavorite: boolean;

    @Column({default: false})
    isPromoted: boolean;


    @Column()
    parking: boolean

    @OneToMany(type => Image, listOfImages => listOfImages.id_estate,)
    listOfImages: Image[]

    @ManyToOne(type => EstateSubCategory, id => id.listOfEstates)
    id_estate_sub_category: EstateSubCategory;

    @ManyToOne(type => TransactionType, id => id.listOfEstates)
    id_transaction_type: TransactionType;

    @ManyToOne(type => Heating, id => id.listOfEstates, {nullable: true})
    id_heating: Heating

    @ManyToOne(type => EstateType, id => id.listOfEstates, {nullable: true})
    id_estate_type: EstateType

    @ManyToOne(type => Equipment, id => id.listOfEstates, {nullable: true})
    id_equipment: Equipment

    @OneToOne(type => Location)
    @JoinColumn()
    id_location: Location

    @ManyToMany(type => Accessories, estate => estate.listOfEstates, {nullable: true})
    @JoinTable()
    listOfAccessories: Accessories[];


    constructor() {
        super();
    }
}
