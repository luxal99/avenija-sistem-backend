import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => User, listOfUsers => listOfUsers.id_role)
    listOfUsers: User[];


    constructor(title: string) {
        super()
        this.title = title;
    }

}
