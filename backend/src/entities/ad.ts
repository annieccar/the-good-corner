import {
    BaseEntity,
    Column, Entity,
    PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable
} from "typeorm";

import { Length} from "class-validator";

import {Category} from "../../src/entities/category"
import {Tag} from "../../src/entities/tag"



@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:5})
    @Length(0,5, {
        message: "Too many characters"
    })
    title: string 

    @Column()
    description: string

    @Column({length:100})
    owner: string 

    @Column()
 	price: number

    @Column({length:100})
    picture: string

    @Column({length:100})
    location: string 

    @Column()
    createdAt: Date

    @ManyToOne(() => Category, category => category.ad) 
    category: Category

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[]
}