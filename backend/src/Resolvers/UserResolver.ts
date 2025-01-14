import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { User } from "../entities/user";
import { Arg, Mutation,  Query,  Resolver } from "type-graphql";
import { UserInput } from "../Inputs/UserInput";

@Resolver(User)
export class UserResolver {
    @Mutation(()=> String)
    async register(@Arg("data") { email, password }: UserInput) {
        const result = await User.save({
            email: email,
            hashedPassword: await argon2.hash(password)
        })
        console.log("result:", result);
        return "ok"
    }

    @Query(() => String)
     async login(@Arg("data") { email, password }: UserInput) {
        try{
            let isPasswordValid = false
            const user = await User.findOneByOrFail({
            email: email,
            })
            if(user){
            isPasswordValid = await argon2.verify(user.hashedPassword, password)
            }
            if (isPasswordValid){
            const token = jwt.sign({email: email}, process.env.JWT_SECRET_KEY as jwt.Secret)
            return token
            }else{
                return "Incorrect Login"
            }
        }
        catch(e)
        {
            return "Incorrect Login"
        }

      }
}