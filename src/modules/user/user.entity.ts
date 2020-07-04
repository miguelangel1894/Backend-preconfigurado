import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, ManyToMany, JoinColumn } from "typeorm";
import { UserDetail } from "./user.detail.entity";
import { Role } from "../role/role.entity";

@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar', unique: true, length: 25, nullable: false})
    username: string

    @Column({type: 'varchar', nullable: false})
    email: string

    @Column({type:'varchar', nullable: false})
    password: string

    /* -----------Relación---------------------------- */
    @OneToOne(type => UserDetail,{
        cascade: true, 
        nullable: false, 
        eager: true})
        @JoinTable({name: 'detail_id'})
        details: UserDetail

    /* ----------------------------------------------- */
    @ManyToMany(type => Role, role => role.user)
    @JoinTable({name: 'user_roles'})
    roles: Role[]
    /* ----------------------------------------------- */

    @Column({type:'varchar', default:'ACTIVE', length: 8})
    status: string

    @Column({type:'timestamp', name: 'created_at'})
    createdAt: Date

    @Column({type:'timestamp', name: 'updated_at'})
    updateAt: Date
}