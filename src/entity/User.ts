import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";
import {UserInfo} from "./UserInfo";

@Entity()
export class User extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    username: string;

    @Column()
    password: string;

    @ManyToOne(type => Role, id => id.listOfUsers)
    id_role: Role

    @OneToOne(type => UserInfo)
    @JoinColumn()
    id_user_info: UserInfo;


    constructor(username?: string, password?: string, id_role?: Role, id_user_info?: UserInfo) {
        super();
        this.username = username;
        this.password = password;
        this.id_role = id_role;
        this.id_user_info = id_user_info;
    }
}
