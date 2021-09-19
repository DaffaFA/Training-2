import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Currency } from "./entities/Currency";

export default {
  entities: [Currency],
  type: 'postgresql',
  dbName: 'training',
  user: 'postgres',
  password: 'komputer123',
  tsNode:true,
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/
  }
} as Parameters<typeof MikroORM.init>[0];