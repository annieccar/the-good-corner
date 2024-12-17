import {
    BaseEntity,
    Column, Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Ad } from "./ad";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Picture extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    url: string 

    @ManyToOne(() => Ad, ad => ad.pictures, {
        onDelete: 'CASCADE' 
      }) 
    ad: Ad
}