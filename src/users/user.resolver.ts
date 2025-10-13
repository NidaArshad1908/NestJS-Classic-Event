import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  @UseGuards(FirebaseAuthGuard) // ensure Firebase token valid
  async registerUser(
    @CurrentUser() user: any,
    @Args('name', { type: () => String, nullable: true }) name?: string,
  ): Promise<User> {
    return this.userService.createOrUpdateUser(user.uid, user.email, name);
  }
}
