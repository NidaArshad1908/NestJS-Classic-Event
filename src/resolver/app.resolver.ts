import { Resolver, Query } from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class Hello {
  @Field()
  message: string;
}

@Resolver()
export class AppResolver {
  @Query(() => Hello)
  hello() {
    return { message: 'NestJS + GraphQL is working 🚀' };
  }
}
