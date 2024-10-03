import {
    BaseEntity,
    Column, Entity,
    PrimaryGeneratedColumn, OneToMany
} from "typeorm";

import {Ad} from "../../src/entities/ad"


@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string 

    @OneToMany(() => Ad, ad => ad.category)
    ad: Ad[]
}