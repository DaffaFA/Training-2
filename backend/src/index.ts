import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import cors from "cors";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { CurrencyResolver } from "./resolvers/CurrencyResolver";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  app.use(cors({ origin: "http://localhost:3000" }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, CurrencyResolver],
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    context: ({req, res}) => ({
      req, res, em: orm.em
    })
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: app,
    cors: false,
  });

  app.listen(8000, () => console.log("Server listening on port 8000"));
};

main();
