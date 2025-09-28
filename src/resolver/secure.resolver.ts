import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver()
@UseGuards(FirebaseAuthGuard)
export class SecureResolver {
  @Query(() => String)
  secureHello(
    @CurrentUser()
    user: {
      email?: string;
      uid?: string;
    },
  ) {
    return `Hello ${user.email || user.uid}, you are authenticated!`;
  }
}
