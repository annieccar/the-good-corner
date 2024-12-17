import {
    BaseEntity,
    Column, Entity,
    PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable,
    OneToMany
} from "typeorm";

import { Length} from "class-validator";

import {Category} from "../../src/entities/category"
import {Tag} from "../../src/entities/tag"
import { Picture } from "./picture";
import { Field, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class Ad extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({length:5})
    @Length(0,30, {
        message: "Too many characters"
    })
    title: string 

    @Field()
    @Column()
    description: string

    @Field()
    @Column({length:100})
    owner: string 

    @Field()
    @Column()
 	price: number

    @Field()
    @Column({length:100})
    location: string 

    @Field()
    @Column()
    createdAt: Date

    @Field(()=>[Picture])
    @OneToMany(() => Picture, picture => picture.ad, {
        cascade: true,
        eager: true,
      })
    pictures: Picture[]

    @Field(()=>Category, {nullable:true})
    @ManyToOne(() => Category, category => category.ads,  { eager: true }) 
    category: Category

    @Field(()=>[Tag], {nullable:true})
    @ManyToMany(() => Tag, (tag) => tag.ads,  { eager: true })
    @JoinTable()
    tags?: Tag[]
}