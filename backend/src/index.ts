import 'dotenv/config'
import { startStandaloneServer } from '@apollo/server/standalone'
import "reflect-metadata"; // add this
import { ApolloServer } from "@apollo/server";
import * as jwt from "jsonwebtoken";
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
        authChecker:({context})=>{
          if (context.email){
            return true
          }else{
            return false
          }
        }
    });
    
    const server = new ApolloServer({
      schema
    });

    const { url } = await startStandaloneServer(server, { listen: { port: 4000 },
    context: async ({req})=>{
      const token = req.headers.authorization?.split(' ')[1];
      if (token){
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as jwt.Secret)
        console.log("payload:", payload)
        if(payload){
          console.log("payload was found and returned to resolver");
          return payload;
        }
      }
      return {}
    }
    });
    console.log(`🚀 Server listening at: ${url}`);

}

start()


