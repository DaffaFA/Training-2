import { EntityManager } from "@mikro-orm/core";

export interface Context {
  req: Request,
  res: Response,
  em: EntityManager
}