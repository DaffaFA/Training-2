import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Currency {

  @PrimaryKey()
  @Field()
  id!: number;

  @Property()
  @Field()
  country!: string;

  @Property()
  @Field()
  value!: string;

  @Property()
  @Field()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @Field()
  updatedAt: Date = new Date();
}