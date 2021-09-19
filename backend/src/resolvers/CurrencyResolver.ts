import { Currency } from "../entities/Currency";
import { Context } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class CurrencyInput {
  @Field(() => String)
  country: string;
  
  @Field(() => String)
  value: string;
}

@Resolver()
export class CurrencyResolver {
  @Query(() => [Currency])
  async currencies(@Ctx() { em }: Context) {
    const currencies = await em.find(Currency, {});

    return currencies;
  }

  @Query(() => Currency)
  async currency(@Ctx() { em }: Context, @Arg("id", () => Number) id: number) {
    const currency = await em.findOneOrFail(Currency, { id: id });

    return currency;
  }

  @Mutation(() => [Currency])
  async createCurrency(@Ctx() { em }: Context, @Arg('currency', () => CurrencyInput) currency: CurrencyInput) {
    const data = em.create(Currency, currency);
    await em.persistAndFlush(data);
  }

  @Mutation(() => [Currency])
  async deleteCurrency(@Ctx() { em }: Context, @Arg('id', () => Number) id: number) {
    await em.nativeDelete(Currency, {id: id})

    const currencies = await em.find(Currency, {});
    return currencies;
  }
}
