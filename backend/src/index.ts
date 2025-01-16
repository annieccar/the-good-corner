import 'dotenv/config'
import { startStandaloneServer } from '@apollo/server/standalone'
import "reflect-metadata"; // add this
import { ApolloServer } from "@apollo/server";
import * as jwt from "jsonwebtoken";
import * as cookie from "cookie";
import { buildSchema } from 'type-graphql';
import { AdResolver } from './Resolvers/AdResolver';
import { dataSource } from './config/db';
import { CategoriesResolver } from './Resolvers/CategoryResolver';
import { TagsResolver } from './Resolvers/TagResolver';
import { UserResolver } from './Resolvers/UserResolver';

const start =async() =>{
    await dataSource.initialize();

    const schema = await buildSchema({
        resolvers: [AdResolver, CategoriesResolver, TagsResolver, UserResolver],
        authChecker:({context}, role)=>{
          if (context.payload){
            if(role.length === 0){
              return true
            }else {
              if(role.includes(context.payload.userRole)){
                return true
              }else{
                return false}
            }
          }else{
            return false
          }
        }
    });
    
    const server = new ApolloServer({
      schema
    });

    const { url } = await startStandaloneServer(server, { listen: { port: 4000 },
    context: async ({req,res})=>{
      if (req.headers.cookie){
        const cookies = cookie.parse(req.headers.cookie)
        if(cookies.token){
          const payload = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY as jwt.Secret)
          console.log("payload:", payload)
          if(payload){
            console.log("payload was found and returned to resolver");
            return {payload: payload, res:res};
          }
        }
      }
      return {res:res}
    }
    });
    console.log(`🚀 Server listening at: ${url}`);

}

start()


