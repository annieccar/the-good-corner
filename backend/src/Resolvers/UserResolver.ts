import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { User } from "../entities/user";
import { Arg, Ctx, Field, Mutation,  ObjectType,  Query,  Resolver } from "type-graphql";
import { UserInput } from "../Inputs/UserInput";

@ObjectType()
class UserInfo{
    @Field()
    isLoggedIn: boolean;

    @Field({nullable: true})
    email?: string;

    @Field({nullable: true})
    userRole?: string;

    @Field({nullable: true})
    userId?: number
}


@Resolver(User)
export class UserResolver {
    @Mutation(()=> String)
    async register(@Arg("data") { email, password }: UserInput, @Ctx() context:any) {
        const result = await User.save({
            email: email,
            hashedPassword: await argon2.hash(password)
        })
        if (result){
            const token = jwt.sign({email: result.email, userId: result.id, userRole: result.userRole}, process.env.JWT_SECRET_KEY as jwt.Secret)
            context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`)
            return 'user created'
            }
        console.log("result:", result);
        return "User could not be registered"
    }

    @Mutation(() => String)
     async login(@Arg("data") { email, password }: UserInput, @Ctx() context:any) {
        console.log("in login resolver:", context)
        try{
            let isPasswordValid = false
            const user = await User.findOneByOrFail({
            email: email,
            })
            if(user){
            isPasswordValid = await argon2.verify(user.hashedPassword, password)
            }
            if (isPasswordValid){
            const token = jwt.sign({email: email, userId: user.id, userRole: user.userRole}, process.env.JWT_SECRET_KEY as jwt.Secret)
            context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`)
            return "user logged in"
            }else{
                return "Incorrect Login"
            }
        }
        catch(e)
        {
            return "Incorrect Login"
        }

      }

      @Mutation(() => String)
      async logout( @Ctx() context:any) {
         console.log("in logout resolver:", context)
         try{
             context.res.setHeader("Set-Cookie", `token=; Secure; HttpOnly`)
             return "user logged out"
         }
         catch(e)
         {
             return "Could not be logged out"
         }
 
       }

      @Query(() => UserInfo)
      async getUserInfo(@Ctx() context:any) {
        console.log("in user info resolver, context:", context.payload)
         if(context.payload){
            return {
                isLoggedIn: true, 
                email: context.payload.email, 
                userId: context.payload.userId,
                userRole: context.payload.userRole
            }
         } else {
            return {isLoggedIn: false}
         }
 
       }
}