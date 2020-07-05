import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity('roles')
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar', length: 20, nullable: false})
    name: string

    @Column({type: 'varchar', nullable: false})
    description: string

    /* -----------Relación---------------------------- */
    @ManyToMany(type => User, user => user.roles)
    @JoinColumn()
    user: User[]
    /* ----------------------------------------------- */
    
    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string

    @CreateDateColumn({type:'timestamp', name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({type:'timestamp', name: 'updated_at'})
    updateAt: Date
}