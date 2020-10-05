import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class EstateType extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


}
