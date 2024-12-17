
import { Category } from "../entities/category"
import { Field, ID, InputType } from "type-graphql"


@InputType()
export class AdInput   {

    @Field()
    title: string 

    @Field()
    description: string

    @Field()
    owner: string 

    @Field()
 	price: number

    @Field()
    location: string

    @Field(() => [String],{nullable : true})
    pictures?: string[]
    
    @Field(()=>ID)
    category: Category

    @Field(() => [ID],{nullable : true})
    tags?: number[]
}

@InputType()
export class AdInputWithId   {
    @Field()
    id: number 

    @Field({nullable : true})
    title: string 

    @Field({nullable : true})
    description: string

    @Field({nullable : true})
    owner: string 

    @Field({nullable : true})
 	price: number

    @Field({nullable : true})
    location: string
    
    @Field(() => [String],{nullable : true})
    pictures?: string[]
    
    @Field(()=>ID, {nullable : true})
    category: Category

    @Field(() => [ID],{nullable : true})
    tags?: number[]
}