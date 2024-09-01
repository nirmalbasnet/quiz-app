import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const user = this.create(authCredentialsDto);

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    try {
      await this.save(user);
      return user;
    } catch (err) {
      throw new ConflictException(err.detail);
    }
  }
}
