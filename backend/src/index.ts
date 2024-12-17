
import { startStandaloneServer } from '@apollo/server/standalone'
import "reflect-metadata"; // add this
import { ApolloServer } from "@apollo/server";
import { buildSchema } from 'type-graphql';
import { AdResolver } from './Resolvers/AdResolver';
import { dataSource } from './config/db';
import { CategoriesResolver } from './Resolvers/CategoryResolver';
import { TagsResolver } from './Resolvers/TagResolver';

const start =async() =>{
    await dataSource.initialize();

    const schema = await buildSchema({
        resolvers: [AdResolver, CategoriesResolver, TagsResolver],
    });
    
    const server = new ApolloServer({
      schema
    });

    const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
    console.log(`🚀 Server listening at: ${url}`);

}

start()


