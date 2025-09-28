import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

interface User {
  id: string;
  email: string;
}

interface GqlContext {
  req?: {
    user?: User;
  };
  user?: User;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User | undefined => {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<GqlContext>();
    return gqlContext.req?.user ?? gqlContext.user;
  },
);
