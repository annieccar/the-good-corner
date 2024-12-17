import {
    BaseEntity,
    Column, Entity,
    PrimaryGeneratedColumn, OneToMany
} from "typeorm";

import {Ad} from "../../src/entities/ad"
import { Field, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class Category extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string 

    @OneToMany(() => Ad, ad => ad.category)
    ads: Ad[]
}