import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, Entity, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity('Books')
export class Book extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar', length: 100, nullable: false})
    name: string

    @Column({type: 'varchar', length: 500})
    description: string

    @ManyToMany(type => User, user => user.books, {eager: true})
    @JoinColumn()
    authors: User[]

    @Column({type:'varchar', default:'ACTIVE', length: 8})
    status: string

    @CreateDateColumn({type:'timestamp', name: 'created_at'})
    createdAt: Date

    @CreateDateColumn({type:'timestamp', name: 'updated_at'})
    updateAt: Date
}