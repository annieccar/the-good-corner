import {  ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class TempUser extends BaseEntity{
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    hashedPassword: string

    @Column()
    randomCode: number
}