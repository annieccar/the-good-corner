import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./ad";

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({default: "USER"})
    userRole: string;

    @Field()
    @Column({unique: true})
    email: string;

    @Column()
    hashedPassword: string

    @OneToMany(() => Ad, ad => ad.user)
    @Field(()=>[Ad])
    ads: Ad[]
}