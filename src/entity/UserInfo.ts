import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserInfo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    telephone: string;


    constructor(full_name?: string, email?: string, telephone?: string) {
        super();
        this.full_name = full_name;
        this.email = email;
        this.telephone = telephone;
    }
}
