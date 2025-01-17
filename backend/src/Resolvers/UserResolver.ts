import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { Resend } from 'resend';

import { User } from "../entities/user";
import { Arg, Ctx, Field, Mutation,  ObjectType,  Query,  Resolver } from "type-graphql";
import { UserInput } from "../Inputs/UserInput";
import { TempUser } from "../entities/tempUser";

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
    async confirmEmail(@Arg("data") { email, password }: UserInput) {
        const randomCode = Math.floor(Math.random()*(9999-1000+1)+1000);
        const result = await TempUser.save({
            email: email,
            hashedPassword: await argon2.hash(password),
            randomCode: randomCode
        })
        if (result){
            console.log("result:", result);
            const resend = new Resend(process.env.RESEND_API_KEY);
            (async function () {
                const { data, error } = await resend.emails.send({
                  from: 'Acme <onboarding@resend.dev>',
                  to: [email],
                  subject: 'The-good-corner: Verify your email address',
                  html: `
                  <p>This is your validation code: <strong>${randomCode}</strong></p>
                  `,
                });
              
                if (error) {
                  return console.error({ error });
                }
              
                console.log({ data });
              })();

            return 'Temp user created'
            }
        return "User could not be registered"
    }

    @Mutation(()=> String)
    async register(@Arg("data") randomCode:number ) {
        const tempUser = await TempUser.findOneByOrFail({
              randomCode: randomCode,
            })
        if (tempUser){
            const registeredUser = await User.save({
                email: tempUser.email,
                hashedPassword: tempUser.hashedPassword,
            })
            if(registeredUser){
                tempUser.remove()
                return "user registered"
            }else{
                return "user could not be registered"
            }  
        }else{
            return "user could not be registered"
        }  
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