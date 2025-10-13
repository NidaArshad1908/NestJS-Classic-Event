import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createOrUpdateUser(
    uid: string,
    email: string,
    name?: string,
  ): Promise<User> {
    let user = await this.userRepo.findOne({ where: { uid } });
    if (!user) {
      user = this.userRepo.create({ uid, email, name });
    } else {
      user.name = name || user.name;
    }
    return this.userRepo.save(user);
  }

  async findByUid(uid: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { uid } });
  }
}
